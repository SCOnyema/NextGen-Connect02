import React, { useState, useEffect }from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";

// set up the localizer for moment
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState("month");
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            console.log("Fetching events....");
            const eventsCollection = collection(db, 'events');

            onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    console.log("No user logged in");
                    return;
                }

                console.log("User ID: " + user.uid);

                // Fetch user role from Firestore
                const userRef = doc(db, "Users", user.uid);
                const userSnap = await getDoc(userRef);
                if (!userSnap.exists()) {
                    console.log("User document does not exist");
                    return;
                }

                const userRole = userSnap.data().role;
                let eventsQuery;

                if (userRole.toLowerCase() === "organizer") {
                    // Fetch only the events created by this organizer
                    eventsQuery = query(collection(db, 'events'), where("organizerId", "==", user.uid));
                } else {
                    // Fetch all events for students
                    eventsQuery = collection(db, 'events');
                }

                const querySnapshot = await getDocs(eventsQuery);
                const today = new Date();

                /*const querySnapshot = await getDocs(eventsCollection);*/
                const eventsData = querySnapshot.docs.map((doc) => ({
                    // format events for the calendar
                    title: doc.data().title,
                    start: new Date(doc.data().date),
                    end: new Date(doc.data().date),
                    allDay: true,
                })).filter(event => event.end >= today); // removes past event from calendar

                console.log("Events fetched: ", eventsData);
                setEvents(eventsData);

            });
            
        };

        fetchEvents();
    }, []);


    const handleNavigate = (newDate) =>{
        setDate(newDate);
    }

    const handleViewChange = (newView) => {
        setView(newView); // Update the view state when buttons are clicked
    };

    return (
        <div className="calendar-container">
            <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={date}
                onNavigate={handleNavigate}// handle navigate buttons
                onView={handleViewChange} // Handle view changes
                view={view} // view state to the Calendar
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );


    };

export default CalendarPage;