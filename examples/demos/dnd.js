import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events-dnd';

let Dnd = React.createClass({
    render(){
        return (
            <BigCalendar
                events={events}
                defaultDate={new Date(2015, 3, 1)}
            />
        )
    }
})

export default Dnd;
