import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc, getDocs, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import EventGridSwipe from '../components/EventGridSwipe';
import RegisteredEventsList from "../components/RegisteredEventsList";
import CreateEventForm from "../components/CreateEventForm";
import ManageEventsList from "../components/ManageEventsList";
import ManageAttendeesList from "../components/ManageAttendeesList.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

const Dashboard = () => {
    const [userRole, setUserRole] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [attendees, setAttendees] = useState([]);

    // Fetch attendees for each event
    const fetchAttendees = async () => {
        try {
            const eventsCollection = collection(db, 'events');
            const querySnapshot = await getDocs(eventsCollection);
            const attendeesData = {};

            // fetch all events

            querySnapshot.docs.forEach((doc) => {
                const eventId = doc.id;
                const eventData = doc.data();
                attendeesData[eventId] = eventData.registeredStudents || []; // Fetch registered attendees
            });

            setAttendees(attendeesData); // Update attendees state
        } catch (error) {
            console.error("Error fetching attendees:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("User is signed in:", user.uid);
                const docRef = doc(db, "Users", user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log("User role:", docSnap.data().role);
                        setUserRole(docSnap.data().role);

                        // Fetch events for both organizers and students
                        const eventsCollection = collection(db, 'events');
                        const querySnapshot = await getDocs(eventsCollection);
                        const eventsData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        //set all events
                        setEvents(eventsData);

                        // fetch attendees for each event
                        await fetchAttendees();

                        // filter registered events for students
                        if (docSnap.data().role.toLowerCase() === "student") {
                            const registeredEvents = eventsData.filter(event =>
                                event.registeredStudents?.includes(user.uid)
                            );
                            setRegisteredEvents(registeredEvents);
                        }
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user role or events:", error);
                }
            } else {
                console.log("No user is signed in.");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Create a new event (for organizers)
    const handleCreateEvent = async (eventData) => {
        try {
            const docRef = await addDoc(collection(db, 'events'), {
                ...eventData,
                organizerId: auth.currentUser.uid, // Link event to the organizer
            });
            console.log('Event created with ID:', docRef.id);
            setEvents((prevEvents) => [...prevEvents, {id: docRef.id, ...eventData}]); // Update local state
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    // Register for an event (for students)
    const handleRegisterForEvent = async (eventId) => {
        try {
            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, {
                registeredStudents: arrayUnion(auth.currentUser.uid),
            });
            console.log('Registered for event:', eventId);

            // Update registered events for the student
            const eventToRegister = events.find(event => event.id === eventId);
            if (eventToRegister) {
                setRegisteredEvents((prevRegisteredEvents) => [
                    ...prevRegisteredEvents,
                    eventToRegister,
                ]);
            }
        } catch (error) {
            console.error('Error registering for event:', error);
        }
    };

    // handle unregister event for student
    const handleUnregisterEvent = async (eventId) => {
        try {
            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, {
                registeredStudents: arrayRemove(auth.currentUser.uid), // Remove the student's ID
            });
            console.log('Unregistered from event:', eventId);

            // Update local state to remove the event from registeredEvents
            setRegisteredEvents((prevRegisteredEvents) =>
                prevRegisteredEvents.filter((event) => event.id !== eventId)
            );
        } catch (error) {
            console.error('Error unregistering from event:', error);
        }
    };


    // Update an existing event (for organizers)
    const handleUpdateEvent = async (eventId, updatedData) => {
        try {
            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, updatedData);
            console.log('Event updated:', eventId);

            // Update local state
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === eventId ? {...event, ...updatedData} : event
                )
            );
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    // remove attendees (organizer)

    const handleRemoveAttendee = async (eventId, attendeeId) => {
        try {
            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, {
                registeredStudents: arrayRemove(attendeeId), // Remove the attendee
            });

            // Update local state
            setAttendees((prevAttendees) => ({
                ...prevAttendees,
                [eventId]: prevAttendees[eventId].filter((id) => id !== attendeeId),
            }));

            console.log('Attendee removed:', attendeeId);
        } catch (error) {
            console.error('Error removing attendee:', error);
        }
    };


    // Delete an event (for organizers)
    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteDoc(doc(db, 'events', eventId));
            console.log('Event deleted:', eventId);

            // Update local state
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show a loading message while fetching the role
    }

 /*   const handleRegisterForEvent = async (eventId) => {
        try {
            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, {
                registeredStudents: arrayUnion(auth.currentUser.uid), // Add student ID to the event
            });
            console.log('Registered for event:', eventId);
        } catch (error) {
            console.error('Error registering for event:', error);
        }
    };*/

    if (userRole.toLowerCase() === "student") {
        return (
            <div className="p-4">
                <p className="text-gray-700">Welcome to your student dashboard.</p>
                <div className="flex flex-col gap-8">
                    <div className="w-full">
                        <ErrorBoundary>
                        <EventGridSwipe events={events} onRegister={handleRegisterForEvent} />
                        </ErrorBoundary>
                    </div>
                    <div className="w-full">
                        <RegisteredEventsList events={registeredEvents} onUnregister={handleUnregisterEvent} />
                    </div>
                </div>
            </div>
        );
    } else if (userRole.toLowerCase() === "organizer") {
        return (
            <div className="p-4">
                <p className="text-gray-700">Welcome to your organizer dashboard.</p>
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Create Event</h2>
                    <CreateEventForm onCreateEvent={handleCreateEvent}/>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Manage Events</h2>
                    <ManageEventsList
                        events={events}
                        onUpdateEvent={handleUpdateEvent}
                        onDeleteEvent={handleDeleteEvent}
                    />
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Manage Attendees</h2>
                    {Object.entries(attendees).map(([eventId, attendeesList]) => (
                        <ManageAttendeesList
                            key={eventId}
                            eventId={eventId}
                            attendees={attendeesList}
                            onRemoveAttendee={handleRemoveAttendee}
                        />
                    ))}
                </div>

            </div>
        );
    } else {
        return <p>An error occurred. Please try logging in again or check internet connection.</p>;
    }
};

export default Dashboard;