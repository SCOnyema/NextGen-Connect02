const RegisteredEventsList = ({ events, onUnregister }) => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Registered Events</h2>
            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md p-4 w-1/2">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                        <div className="mt-4">
                            <span className="text-sm text-gray-500">{event.date}</span>
                            <span className="text-sm text-gray-500 ml-2">• {event.location}</span>
                            <span className="text-sm text-gray-500 ml-2">• {event.category}</span>
                        </div>
                        <button
                            onClick={() => onUnregister(event.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700"
                        >
                            Unregister
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegisteredEventsList;
