import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const EventCard = ({ event, onRegister }) => {
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    // Auto-close registration modal after 3 seconds
    useEffect(() => {
        if (showRegistrationModal) {
            const timer = setTimeout(() => {
                setShowRegistrationModal(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showRegistrationModal]);

    const truncateText = (text, charLimit) => {
        if (!text) return '';
        return text.length > charLimit ? `${text.substring(0, charLimit)}...` : text;
    };

    const handleRegister = () => {
        onRegister(event.id);
        setShowRegistrationModal(true);
    };

    if (!event) {
        return <p>Event data is missing.</p>;
    }

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-4 w-full h-full">
            <div className="p-4">
                <h2 className="text-xl font-bold">{event.title || "Untitled Event"}</h2>
                <p className="text-gray-600 mt-2 ">
                    {truncateText(event.description, 100)}
                    {event.description.length > 100 && (
                        <button
                            onClick={() => setShowDescriptionModal(true)}
                            className="text-blue-600 ml-1"
                        >
                            Read More
                        </button>
                    )}
                </p>
                <div className="mt-4">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2">
                        {event.date}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">{event.location}</span>
                    <span className="text-sm text-gray-500 ml-2">• {event.category}</span>
                </div>
                <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full w-full hover:bg-blue-700"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>

            {/* Description Modal */}
            {showDescriptionModal && ReactDOM.createPortal(
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowDescriptionModal(false)}
                >
                    <div
                        className="bg-white rounded-lg w-full p-6 max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Event Description</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setShowDescriptionModal(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}

            {/* Registration Success Modal */}
            {showRegistrationModal && ReactDOM.createPortal(
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowRegistrationModal(false)}
                >
                    <div
                        className="bg-white rounded-lg w-full p-6 max-w-md text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Success!</h2>
                        <p className="text-gray-700 mb-4">
                            You've successfully registered for<br/>
                            <strong>{event.title}</strong>
                        </p>
                        <button
                            onClick={() => setShowRegistrationModal(false)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                        >
                            OK
                        </button>
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}
        </div>
    );
};

export default EventCard;