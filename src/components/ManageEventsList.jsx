import React, { useState } from 'react';

const ManageEventsList = ({ events, onUpdateEvent, onDeleteEvent }) => {
    const [editingEvent, setEditingEvent] = useState(null); // Track the event being edited
    const [formData, setFormData] = useState({}); // Form data for editing
    const [eventToDelete, setEventToDelete] = useState(null); // Track the event being deleted

    // Handle edit button click
    const handleEditClick = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
        });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting updated data for event', editingEvent.id, formData);
        onUpdateEvent(editingEvent.id, formData); // Pass updated data to the parent component
        setEditingEvent(null); // Close the edit form
    };

    // Handle delete button click
    const handleDeleteClick = (event) => {
        setEventToDelete(event); // Open confirmation modal for selected event
    };

    // Confirm delete action
    const handleConfirmDelete = () => {
        if (eventToDelete) {
            onDeleteEvent(eventToDelete.id); // Delete the event
            setEventToDelete(null); // Close the modal
        }
    };

    return (
        <div className="space-y-4">
            {events.length === 0 ? (
                <p className="text-gray-500 text-sm sm:text-base py-4">
                    You don't have any created events yet.
                </p>
            ) : (
                events.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                        <div className="mt-4">
                            <span className="text-sm text-gray-500">{event.date}</span>
                            <span className="text-sm text-gray-500 ml-2">{event.location}</span>
                            <span className="text-sm text-gray-500 ml-2">• {event.category}</span>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => handleEditClick(event)}
                                className="bg-green-600 text-white px-4 py-2 rounded-full mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteClick(event)}
                                className="bg-red-600 text-white px-4 py-2 rounded-full"
                            >
                                Delete
                            </button>
                        </div>

                        {/* Edit Form (Modal) */}
                        {editingEvent && editingEvent.id === event.id && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Event Title"
                                            value={formData.title || ''}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        <textarea
                                            name="description"
                                            placeholder="Event Description"
                                            value={formData.description || ''}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date || ''}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            value={formData.location || ''}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />

                                        <div className="flex justify-end space-x-4">
                                            <button
                                                type="button"
                                                onClick={() => setEditingEvent(null)}
                                                className="bg-gray-600 text-white px-4 py-2 rounded-full"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}

            {/* Confirmation Modal */}
            {eventToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete <strong>{eventToDelete.title}</strong>? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setEventToDelete(null)} // Close modal
                                className="bg-gray-600 text-white px-4 py-2 rounded-full"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete} // Confirm delete
                                className="bg-red-600 text-white px-4 py-2 rounded-full"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEventsList;