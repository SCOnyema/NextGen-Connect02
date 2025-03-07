import React, { useState } from 'react';
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CardGrid from "../components/CardGrid";
import mentorshipImage from "../assets/mentorshipcomputing.webp";

const Mentorship = () => {
    const [search, setSearch] = useState("");

    const items = [
        {
            title: "Programming Mentorship",
            description: "Refine your programming skills through personalized sessions with a tech expert.",
            tags: ["Virtual", "Free"],
            buttonText: "Apply Now"
        },
        {
            title: "Career Development in Tech",
            description: "Guidance on career paths in technology, resume building, and interview preparation.",
            tags: ["In-Person", "Paid"],
            buttonText: "View Details"
        },
        {
            title: "Web Development Mentorship",
            description: "Hands-on web development sessions covering front-end frameworks and backend logic.",
            tags: ["Virtual", "Paid"],
            buttonText: "Sign Up"
        },
        {
            title: "Machine Learning Techniques",
            description: "Master machine learning concepts and real-world application under the guidance of a data scientist.",
            tags: ["In-Person", "Free"],
            buttonText: "Join Now"
        }
    ];

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

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
            <div className="flex p-4">
                <div className="w-full md:w-4/4">
                    <CardGrid items={filteredItems} />
                </div>
            </div>
        </>
    );
};

export default Mentorship;
