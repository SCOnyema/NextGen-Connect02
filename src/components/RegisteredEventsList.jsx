import React, { useState } from 'react';

const RegisteredEventsList = ({ events, onUnregister }) => {
    const [selectedEventId, setSelectedEventId] = useState(null);
    const selectedEvent = events.find(event => event.id === selectedEventId);

    const handleUnregisterConfirm = () => {
        onUnregister(selectedEventId);
        setSelectedEventId(null);
    };

    const handleCancel = () => setSelectedEventId(null);

    return (
        <div className="p-4 shadow-md">
            <h2 className="text-xl font-bold  mb-4">Registered Events</h2>

            <div className="space-y-4">
                {events.length === 0 ? (
                    <p className="text-gray-500 text-sm sm:text-base py-4 sm:py-6 px-4 col-span-full">
                        You don't have any registered events now
                    </p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg w-72 p-4">
                            {/* Title */}
                            <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight sm:leading-snug">{event.title}</h3>
                            {/* Event Details */}
                            <div className="mt-2 flex flex-wrap items-center gap-1">
                                <span className="text-xs sm:text-sm text-gray-500">{event.date}</span>
                                <span className="text-xs sm:text-sm text-gray-500">•</span>
                                <span className="text-xs sm:text-sm text-gray-500">{event.location}</span>
                                <span className="text-xs sm:text-sm text-gray-500">•</span>
                                <span className="text-xs sm:text-sm text-gray-500">{event.category}</span>
                            </div>

                            <button
                                onClick={() => setSelectedEventId(event.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700 text-xs sm:text-sm"
                            >
                                Unregister
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Confirmation Modal */}
            {selectedEventId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Confirm Unregistration</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to unregister from <strong>{selectedEvent?.title}</strong>?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUnregisterConfirm}
                                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                                Yes, Unregister
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisteredEventsList;