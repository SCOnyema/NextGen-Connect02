import React from 'react';

const ManageAttendeesList = ({ eventId, attendees, eventTitle ,onRemoveAttendee }) => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{eventTitle}</h2>
            <div className="space-y-2">
                {attendees.length === 0 ? (
                    <p className="text-gray-500 text-sm sm:text-base py-4">
                        You don't have any registered attendees yet.
                    </p>
                ) : (
                    attendees.map((attendee, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm p-3 flex justify-between items-center"
                        >
                            <span className="text-sm text-gray-700">{attendee}</span>
                            <button
                                onClick={() => onRemoveAttendee(eventId, attendee)}
                                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))

                )}
            </div>
        </div>
    );
};

export default ManageAttendeesList;