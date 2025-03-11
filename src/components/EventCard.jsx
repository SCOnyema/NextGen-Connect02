import React from 'react';

const EventCard = ({ event, onRegister }) => {
    if (!event) {
        return <p>Event data is missing.</p>; // Handle missing event data
    }

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-4 w-72 max-w-full"> {/* Constrain the card width */}
            <div className="p-4">
                <h3 className="text-xl font-bold">{event.title || "Untitled Event"}</h3>
                <p className="text-gray-600 mt-2">{event.description || "No description available"}</p>
                <div className="mt-4">
                    <span className="text-sm text-gray-500">{event.date}</span>
                    <span className="text-sm text-gray-500 ml-2">• {event.location}</span>
                    <span className="text-sm text-gray-500 ml-2">• {event.category}</span>
                </div>
                <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full w-full hover:bg-blue-700"
                    onClick={() => onRegister(event.id)}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default EventCard;