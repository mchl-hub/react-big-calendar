import React from 'react';
import { DragSource } from "react-dnd";
import cn from 'classnames';
import dates from './utils/dates';
import { accessor as get } from './utils/accessors';

const eventCellSource = {
  beginDrag(props) {
    return {
      // TODO: define something that will differ EventCells
      event: props.event
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

let EventCell = React.createClass({
  render() {
    const { connectDragSource, isDragging } = this.props;
    let {
        className, event, selected, eventPropGetter
      , startAccessor, endAccessor, titleAccessor
      , slotStart, slotEnd, onSelect, component, ...props } = this.props;

    let Component = component;

    let title = get(event, titleAccessor)
      , end = get(event, endAccessor)
      , start = get(event, startAccessor)
      , isAllDay = get(event, props.allDayAccessor)
      , continuesPrior = dates.lt(start, slotStart, 'day')
      , continuesAfter = dates.gt(end, slotEnd, 'day')

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

    return connectDragSource(
      <div
        {...props}
        style={{
          ...props.style,
          ...style,
          opacity: isDragging ? 0.5 : 1
        }}
        className={cn('rbc-event', className, xClassName, {
          'rbc-selected': selected,
          'rbc-event-allday': isAllDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
          'rbc-event-continues-prior': continuesPrior,
          'rbc-event-continues-after': continuesAfter
        })}
        onClick={()=> onSelect(event)}
      >
        <div className='rbc-event-content' title={title}>
          { Component
            ? <Component event={event} title={title}/>
            : title
          }
        </div>
      </div>
    );
  }
});

export default DragSource("event_cell", eventCellSource, collect)(EventCell)
