let eventsList = [
    {
        "id": 1,
        "title": "All Day Event",
        "allDay": true,
        "start": new Date(2015, 3, 1),
        "end": new Date(2015, 3, 1)
    },
    {
        "id": 2,
        "title": "Long Event",
        "start": new Date(2015, 3, 7),
        "end": new Date(2015, 3, 10),
    },
    {
        "id": 3,
        "title": "Some Event",
        "start": new Date(2015, 3, 9, 0, 0, 0),
        "end": new Date(2015, 3, 9, 0, 0, 0),
    },
    {
        "id": 4,
        "title": "Conference",
        "start": new Date(2015, 3, 11),
        "end": new Date(2015, 3, 13),
        desc: 'Big conference for important people'
    },
    {
        "id": 5,
        "title": "Meeting",
        "start": new Date(2015, 3, 12, 10, 30, 0, 0),
        "end": new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        "id": 6,
        "title": "Lunch",
        "start": new Date(2015, 3, 12, 12, 0, 0, 0),
        "end": new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        "id": 7,
        "title": "Meeting",
        "start": new Date(2015, 3, 12, 14, 0, 0, 0),
        "end": new Date(2015, 3, 12, 15, 0, 0, 0)
    },
    {
        "id": 8,
        "title": "Happy Hour",
        "start": new Date(2015, 3, 12, 17, 0, 0, 0),
        "end": new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
    },
    {
        "id": 9,
        "title": "Dinner",
        "start": new Date(2015, 3, 12, 20, 0, 0, 0),
        "end": new Date(2015, 3, 12, 21, 0, 0, 0)
    },
    {
        "id": 10,
        "title": "Birthday Party",
        "start": new Date(2015, 3, 13, 7, 0, 0),
        "end": new Date(2015, 3, 13, 10, 30, 0)
    }
];

function updateEventsList(event) {
    console.log("updateEventsList");
    return eventsList.map((elem) => {
        if (elem.id === event.id) {
            return {
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end
            };
        }
        else {
            return elem;
        }
    });
}

export default {
    get: () => { console.log("get list: ", eventsList); return eventsList},
    set: (event) => { eventsList = updateEventsList(event); console.log("list: ", eventsList)}
}
