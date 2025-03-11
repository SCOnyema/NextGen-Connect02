import React, { useState, useEffect }from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// set up the localizer for moment
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchEvents = async () => {
            console.log("Fetching events....");
            const eventsCollection = collection(db, 'events');
            const querySnapshot = await getDocs(eventsCollection);
            const eventsData = querySnapshot.docs.map((doc) => ({
                // format events for the calendar
                title: doc.data().title,
                start: new Date(doc.data().date),
                end: new Date(doc.data().date),
                allDay: true,
            }));

            // format events for the calendar
         /*   const formattedEvents = eventsData.map((event) => ({
                title: event.title,
                start: new Date(event.date),
                end: new Date(event.date),
                allDay: true,
            }));*/

            console.log("Events fetched: ", eventsData);
            setEvents(eventsData);

        };

        fetchEvents();
    }, []);


    const handleNavigate = (newDate) =>{
        setDate(newDate);
    }

    return (
        <div className="calendar-container">
            <h1 className="text-2xl font-bold mb-4"> Event Calendar </h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={date}
                onNavigate={handleNavigate}
                style={{ width: "100%", height: "100%" }}
            />
        </div>

    );


    };

export default CalendarPage;