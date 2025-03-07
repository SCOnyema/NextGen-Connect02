import React, { useState } from 'react';
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CardGrid from "../components/CardGrid";
import competitionImage from "../assets/Coding-Competitions.jpg"; // Make sure this image path is correct

const Compete = () => {
    const [search, setSearch] = useState("");

    const items = [
        {
            title: "Global Hackathon",
            description: "Showcase your coding skills and innovate solutions for global challenges.",
            tags: ["Online", "Free Entry"],
            buttonText: "Participate"
        },
        {
            title: "Emerging Tech Competition",
            description: "Submit your ideas on emerging technologies and compete for funding.",
            tags: ["Online", "Free Entry"],
            buttonText: "Submit Proposal"
        },
        {
            title: "Entrepreneur Pitch Fest",
            description: "Pitch your startup idea to a panel of investors and compete for seed funding.",
            tags: ["In-Person", "Entry Fee"],
            buttonText: "Apply now"
        },
        {
            title: "Design Sprint Challenge",
            description: "Compete in fast-paced design sprints to solve design problems under time pressure.",
            tags: ["Virtual", "Free Entry"],
            buttonText: "Join Challenge"
        }
    ];

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

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
            <div className="flex p-4">
                <div className="w-full md:w-4/4">
                    <CardGrid items={filteredItems} />
                </div>
            </div>
        </>
    );
};

export default Compete;
