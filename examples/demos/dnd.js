import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events-dnd';


require('globalize/lib/cultures/globalize.culture.en-GB');

const defaultCulture = "en-GB";
const defaultDate = new Date(2015, 3, 1);

// Changes global list of events
function moveEvent(event, cell) {
    console.log("moveEvent function called: ", event, cell);
    let start = event.start;
    let end = event.end;
    let seconds = (end.getTime() - start.getTime())/1000;

    event.start = new Date(cell.getTime());
    event.end = new Date(cell.getTime() + seconds*1000);
    console.log("updated event: ", event, seconds);
    events.set(event);
}

let Dnd = React.createClass({
    onMoveEvent() {
        return (event, cell) => {
            moveEvent(event, cell);
            this.props.doRender();
        };
    },
    render(){
        return (
            <BigCalendar
                events={events.get()}
                culture={defaultCulture}
                defaultDate={defaultDate}
                onMoveEvent={this.onMoveEvent()}
            />
        )
    }
})

export default Dnd;
