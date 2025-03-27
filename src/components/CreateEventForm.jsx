import React, { useState, useEffect } from 'react';

const CreateEventForm = ({ onCreateEvent }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
    });

    const [isModalVisible, setIsModalVisible] = useState(false); // Track visibility of confirmation modal

    // Close modal after 3 seconds
    useEffect(() => {
        if (isModalVisible) {
            const timer = setTimeout(() => {
                setIsModalVisible(false);
            }, 3000);

            return () => clearTimeout(timer); // Cleanup on component unmount or modal visibility change
        }
    }, [isModalVisible]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateEvent(formData); // Pass the event data to the parent component
        setFormData({ title: '', description: '', date: '', location: '', category: '' }); // Reset form
        setIsModalVisible(true); // Show confirmation modal
    };

    const handleOutsideClick = (e) => {
        // Check if clicking outside the modal's content area
        if (e.target.dataset.modal) {
            setIsModalVisible(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Event Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Internship">Internship</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full w-auto">
                    Create Event
                </button>
            </form>

            {/* Confirmation Modal */}
            {isModalVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={handleOutsideClick}
                    data-modal="true" // Add data attribute to identify modal background
                >
                    <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                        <h2 className="text-xl font-bold text-center mb-4 text-green-700">Event Posted!</h2>
                        <p className="text-center text-gray-700">
                            Your event <strong>{formData.title || 'New Event'}</strong> was successfully posted.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateEventForm;