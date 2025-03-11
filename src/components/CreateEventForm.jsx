import React, { useState } from 'react';

const CreateEventForm = ({ onCreateEvent }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateEvent(formData); // Pass the event data to the parent component
        setFormData({ title: '', description: '', date: '', location: '', category: '' }); // Reset form
    };

    return (
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full w-full">
                Create Event
            </button>
        </form>
    );
};

export default CreateEventForm;