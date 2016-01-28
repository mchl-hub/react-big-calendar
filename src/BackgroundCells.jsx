import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from "react-dnd";
import cn from 'classnames';
import { segStyle } from './utils/eventLevels';
import { notify } from './utils/helpers';
import { dateCellSelection, slotWidth, getCellAtX, pointInBox } from './utils/selection';
import Selection, { getBoundsForNode } from './Selection';

const singleCellTarget = {
  drop(props, monitor) {
    // TODO: call action that puts EventCell into SingleCell
    // TODO: we can get dragged item by monitor.getItem() (previously set in Source via beginDrag func)
    let item = monitor.getItem();
    console.log("drop event ", item.event, " on target ", props);
    props.onMoveEvent(item.event, props.cell)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class SingleCell extends React.Component {

  static propTypes = {
    i: React.PropTypes.number,
    slots: React.PropTypes.number,
    selecting: React.PropTypes.bool,
    startIdx: React.PropTypes.number,
    endIdx: React.PropTypes.number
  };

  render() {
    const { connectDropTarget, isOver } = this.props;
    let rowIdx = this.props.rowIdx;
    let i = this.props.i;
    let slots = this.props.slots;
    let selecting = this.props.selecting;
    let startIdx = this.props.startIdx;
    let endIdx = this.props.endIdx;
    // TODO: use isOver to change the cell
    return connectDropTarget(
      <div
        key={'bg_' + i}
        style={segStyle(1, slots)}
        className={cn('rbc-day-bg', {
          'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
        })}
      />
    );
  }
}
// TODO: move to seperate file
const SingleCellTarget = DropTarget("event_cell", singleCellTarget, collect)(SingleCell);

class DisplayCells extends React.Component {

  static propTypes = {
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    slots: React.PropTypes.number
  }

  state = { selecting: false }

  componentDidMount(){
    this.props.selectable
      && this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable)
      this._selectable();
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable();
  }

  render(){
    let { slots, row, rowIdx } = this.props;
    let { selecting, startIdx, endIdx } = this.state

    let children = [];

    for (var i = 0; i < slots; i++) {
      children.push(
        <SingleCellTarget onMoveEvent={this.props.onMoveEvent} cell={row[i]} rowIdx={rowIdx} i={i} slots={slots} selecting={selecting} startIdx={startIdx} endIdx={endIdx} />
      )
    }

    return (
      <div className='rbc-row-bg'>
        { children }
      </div>
    )
  }

  _selectable(){
    let node = findDOMNode(this);
    let selector = this._selector = new Selection(this.props.container)

    selector.on('selecting', box => {
      let { slots } = this.props;

      let startIdx = -1;
      let endIdx = -1;

      if (!this.state.selecting) {
        notify(this.props.onSelectStart, [box]);
        this._initial = { x: box.x, y: box.y };
      }
      if (selector.isSelected(node)) {
        let nodeBox = getBoundsForNode(node);

        ({ startIdx, endIdx } = dateCellSelection(
            this._initial
          , nodeBox
          , box
          , slots));
      }

      this.setState({
        selecting: true,
        startIdx, endIdx
      })
    })

    selector
      .on('click', point => {
        let rowBox = getBoundsForNode(node)

        if (pointInBox(rowBox, point)) {
          let width = slotWidth(getBoundsForNode(node),  this.props.slots);
          let currentCell = getCellAtX(rowBox, point.x, width);

          this._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell
          })
        }

        this._initial = {}
        this.setState({ selecting: false })
      })

    selector
      .on('select', () => {
        this._selectSlot(this.state)
        this._initial = {}
        this.setState({ selecting: false })
        notify(this.props.onSelectEnd, [this.state]);
      })
  }

  _teardownSelectable() {
    if (!this._selector) return
    this._selector.teardown();
    this._selector = null;
  }

  _selectSlot({ endIdx, startIdx }) {
    this.props.onSelectSlot &&
      this.props.onSelectSlot({
        start: startIdx, end: endIdx
      })
  }
}

export default DisplayCells;
