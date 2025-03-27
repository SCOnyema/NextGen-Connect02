import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc, getDocs, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import EventGridSwipe from '../components/EventGridSwipe';
import RegisteredEventsList from "../components/RegisteredEventsList";
import CreateEventForm from "../components/CreateEventForm";
import ManageEventsList from "../components/ManageEventsList";
import ManageAttendeesList from "../components/ManageAttendeesList.jsx";
import EventSearch from "../components/EventSearch";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

const Dashboard = () => {
    const [userRole, setUserRole] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [userName, setUserName] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    //separate states for search and filter
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Fetch attendees for each event
    const fetchAttendees = async (user) => {
        try {
            // Verify the uid of the logged-in user
            if (!user || !user.uid) {
                 new Error("Invalid user object or user UID not found!");
            }
            console.log("Logged-in User UID:", user.uid);

            const eventsCollection = collection(db, 'events');
            const querySnapshot = await getDocs(eventsCollection);
            const attendeesData = {};

            //Function to fetch a single user's details by their UID
            const fetchUserName = async (uid) => {
                const userRef = doc(db, 'Users', uid);
                const userSnap = await getDoc(userRef);
                return userSnap.exists() ? userSnap.data().name || 'Unknown User' : `User (${uid.slice(0, 6)}...)`;
            };

            // Iterate over fetched documents
            for (const doc of querySnapshot.docs) {
                const eventId = doc.id;
                const eventData = doc.data();

                console.log("Event Data:", eventData); // Debug event data

                // Filter events by organizerId
                if (eventData.organizerId === user.uid) {
                    // Fetch names for each registered student (UID)
                    const registeredStudents = eventData.registeredStudents || [];
                    const attendeesList = await Promise.all(
                        registeredStudents.map(async (uid) => {
                            return await fetchUserName(uid); // Fetch name for each UID
                        })
                    );

                    attendeesData[eventId] = attendeesList; // Add attendee names to attendeesData
                }
            }

            console.log("Filtered Attendees Data with Names:", attendeesData); // Debug the final result

            // Update attendees state
            setAttendees(attendeesData);
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

                        // display users name
                        const userData = docSnap.data();
                        setUserName(userData.name || "User");

                        // Fetch events for both organizers and students
                        const eventsCollection = collection(db, 'events');
                        const querySnapshot = await getDocs(eventsCollection);
                        const eventsData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        //set all events
                        setEvents(eventsData);

                        // initially no filter
                        setFilteredEvents(eventsData);

                        // fetch attendees for each event
                        await fetchAttendees(user);

                        // fetch created events by Organizer
                        if (docSnap.data().role.toLowerCase() === "organizer") {
                            // Fetch created events for the organizer
                            const createdEvents = eventsData.filter(event =>
                                event.organizerId === user.uid // Filter by organizer ID
                            );

                            // Update state directly
                            setEvents(createdEvents); // All created events
                            setFilteredEvents(createdEvents); // Initially show all created events
                        }

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

    // Handles search (students)
    const handleSearch = (search) => {

        setSearchTerm(search);
    };

    const handleFilter = (category) => {

        setSelectedCategory(category);
    };

    // search and filter logic
    useEffect(() => {
        let filtered = events;

        //search filter
        if (searchTerm){
            filtered = filtered.filter((event) =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // category filter
        if (selectedCategory){
            filtered = filtered.filter(event => event.category === selectedCategory);
        }

        //update filtered events
        setFilteredEvents(filtered);
    }, [events, searchTerm, selectedCategory]);

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
        const eventRef = doc(db, 'events', eventId);
        try {
            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, updatedData);
            console.log('Event updated:', eventId, updatedData);

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

    if (userRole.toLowerCase() === "student") {
        return (
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-snug md:leading-normal">
                    Hello <span className="font-bold">{userName}</span>! Welcome to your dashboard
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-snug md:leading-normal mt-8" > Start Exploring Opportunities </p>
                <EventSearch onSearch={handleSearch} onFilter={handleFilter}/>
                <div className="mt-6">
                    <div className="flex flex-col gap-8">
                        <div className="w-full">
                            <ErrorBoundary>
                                <EventGridSwipe events={filteredEvents} onRegister={handleRegisterForEvent}/>
                            </ErrorBoundary>
                        </div>
                        <div className="w-full">
                            <RegisteredEventsList events={registeredEvents} onUnregister={handleUnregisterEvent}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (userRole.toLowerCase() === "organizer") {
        return (
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-snug md:leading-normal">
                    Hello <span className="font-bold">{userName}</span>! Welcome to your dashboard
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-snug md:leading-normal mt-8"> Start
                    Creating Opportunities </p>
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
                    <h2 className="text-xl font-bold">Manage All Attendees</h2>
                    {Object.entries(attendees).map(([eventId, attendeesList]) => {
                        const event = events.find(event => event.id === eventId);
                        const eventTitle = event ? event.title : "Event not found"; // This will show if the event isn't found
                        return (
                            <ManageAttendeesList
                                key={eventId}
                                eventId={eventId}
                                attendees={attendeesList}
                                eventTitle={eventTitle}
                                onRemoveAttendee={handleRemoveAttendee}
                            />
                        );
                    })}
                </div>

            </div>
        );
    } else {
        return <p>An error occurred. Please try logging in again or check internet connection.</p>;
    }
};

export default Dashboard;
