import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events-dnd';


require('globalize/lib/cultures/globalize.culture.en-GB');

const defaultCulture = "en-GB";
const defaultDate = new Date(2015, 3, 1);

// Changes global list of events
function moveEvent(event, cell) {
    console.log("moveEvent function called");
    const eventId = event.id;
    let seconds = (event.end.getTime() - event.start.getTime())/1000;

    const newEvent = Object.assign({}, event, {
        start: new Date(cell.getTime()),
        end: new Date(cell.getTime() + seconds*1000)
    });
    events.set(eventId, newEvent);
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
