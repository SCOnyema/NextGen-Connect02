import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CardGrid from "../components/CardGrid";
import competitionImage from "../assets/Coding-Competitions.jpg";

const Compete = () => {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const q = query(collection(db, "events"), where("category", "==", "Competition"));
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
                image={competitionImage}
                title="Unlock Your Competitive Edge!"
                subtitle="Step into the arena where skills meet opportunity and ambition."
            />
            <SearchBar
                placeholder="Search for Competitions..."
                onSearch={setSearch}
            />
            <div className="flex p-4 mt-4 mb-10 sm:mb-4">
                <div className="w-full md:w-4/4">
                    <CardGrid events={filteredEvents} />
                </div>
            </div>
        </>
    );
};

export default Compete;
