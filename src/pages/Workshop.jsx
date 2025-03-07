import React, { useState } from 'react';
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CardGrid from "../components/CardGrid";
import workshopImage from "../assets/workshop.jpg"; // Assuming you have an image for workshops

const Workshop = () => {
    const [search, setSearch] = useState("");

    const items = [
        {
            title: "Interactive JavaScript Workshop",
            description: "Master JavaScript through hands-on projects and real-time feedback.",
            tags: ["Virtual", "Paid"],
            buttonText: "Register Now"
        },
        {
            title: "Cybersecurity Fundamentals Workshop",
            description: "Dive into the basics of cybersecurity with practical sessions and expert talks.",
            tags: ["In-Person", "Paid"],
            buttonText: "Join Workshop"
        },
        {
            title: "Mobile App Development Workshop",
            description: "Create your first app in this comprehensive mobile development workshop.",
            tags: ["Virtual", "Paid"],
            buttonText: "Enroll Now"
        },
        {
            title: "Data Analytics Workshop",
            description: "Learn how to transform data into insights in this intensive analytics workshop.",
            tags: ["In-Person", "Paid"],
            buttonText: "Sign Up"
        }
    ];

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <HeroBanner
                image={workshopImage}
                title="Enhance Your Skills with Interactive Workshops"
                subtitle="Engage in practical sessions and master new industry-relevant abilities."
            />
            <SearchBar
                placeholder="Search for Workshop..."
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

export default Workshop;
