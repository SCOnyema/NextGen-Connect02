import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CardGrid from "../components/CardGrid";
import mentorshipImage from "../assets/mentorshipcomputing.webp";


const Mentorship = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const q = query(collection(db, "events"), where("category", "==", "Mentorship"));
                const querySnapshot = await getDocs(q);
                const eventsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(eventsData);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching events:", err);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()));

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <HeroBanner
                image={mentorshipImage}
                title="Unlock Your Potential with Expert Mentorship"
                subtitle="Connect with industry leaders and accelerate your career growth."
            />
            <SearchBar
                placeholder="Search for Mentorship..."
                onSearch={setSearch}
            />
            <>
            <div className="flex p-4 mt-4 mb-10 sm:mb-4">
                <div className="w-full md:w-4/4">
                    <CardGrid events={filteredEvents} />
                </div>
            </div>
            </>
        </>
    );
};

export default Mentorship;
