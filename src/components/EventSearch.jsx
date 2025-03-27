import React,  { useState } from 'react';

const EventSearch = ({ onSearch, onFilter }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        onSearch(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        onFilter(event.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4">
            <input
            type="text"
            placeholder="Search Events"
            className="px-4 py-2 border rounded"
            value={search}
            onChange={handleSearchChange}
            />
            <select className="px-4 py-2 border rounded"
            value={category}
            onChange={handleCategoryChange}
            >
                <option value="">All Categories</option>
                <option value="Internship">Internship</option>
                <option value="Competition">Competition</option>
                <option value="Mentorship">Mentorship</option>
                <option value="Workshop">Workshop</option>

            </select>

        </div>
    );
}

export default EventSearch;