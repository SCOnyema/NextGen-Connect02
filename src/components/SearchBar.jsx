import React from "react";

const SearchBar = ({ placeholder, onSearch }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-100">
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder={placeholder}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;