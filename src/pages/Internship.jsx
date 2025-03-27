import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CardGrid from "../components/CardGrid";
import bannerImage from "../assets/interncomputing.jpg";

const Internship = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const q = query(collection(db, "events"), where("category", "==", "Internship"));
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
            <HeroBanner image={bannerImage}
                        title="Discover Exciting Internships!"
                        subtitle="Explore opportunities tailored to your interests and skills."
            />
            <SearchBar placeholder="Search for internships..."
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

export default Internship;
