import React, {useState} from 'react';
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CardGrid from "../components/CardGrid";
import bannerImage from "../assets/interncomputing.jpg";

const Internship = () => {
    const [search, setSearch] = useState("");

    const items = [
        {
            title: "Software Engineering Internship",
            description: "Join a fast-growing startup and gain hands-on experience. ",
            tags: ["Remote", "Paid"],
            buttonText : "Apply Now"
        },
        {
            title: "Data Science Internship",
            description: "Work with cutting-edge data tools to solve real-world problems.",
            tags: ["On-Site", "Unpaid"],
            buttonText: "View Details",
        },

        {
            title: "Data Science Internship",
            description: "Work with cutting-edge data tools to solve real-world problems.",
            tags: ["On-Site", "Unpaid"],
            buttonText: "View Details",
        },

        {
            title: "Data Science Internship for AI",
            description: "Work with cutting-edge data tools to solve real-world problems.",
            tags: ["On-Site", "Unpaid"],
            buttonText: "View Details",
        },
    ];

      const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <>
            <HeroBanner
                image={bannerImage}
                title="Discover Exciting Internships!"
                subtitle="Explore opportunities tailored to your interests and skills."
            />
            <SearchBar
                placeholder="Search for internships..."
                onSearch={setSearch}
            />
            <div className="flex p-4">
                <div className="w-full md:w-4/4">
                    <CardGrid items={filteredItems}/>
                </div>
            </div>
        </>
    );
};

export default Internship;
