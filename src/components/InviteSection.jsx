import React from 'react';
import { useNavigate } from 'react-router-dom';

function InviteSection() {
    const navigate = useNavigate();

    const handleHostNowClick = () => {
        navigate('/login');
    };

    const handleJoinNowClick = () => {
        navigate('/login');
    };

    return(
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Host Your Own <span className="text-blue-700">Opportunity!</span>
                        </h3>
                        <p className="mt-4 text-gray-600">
                            Engage with a diverse talent pool or hire the best minds.
                        </p>
                        <button
                            onClick={handleHostNowClick}
                            className="mt-6 flex items-center justify-center bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-900">
                            Host Now
                            <span className="ml-2">↗️</span> {/* Arrow icon */}
                        </button>

                    </div>


                    <div className="bg-white p-6 rounded-lg shadow-lg text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Explore Your <span className="text-blue-700">Potential!</span>
                        </h3>
                        <p className="mt-4 text-gray-600">
                            Discover and join leading workshops, mentorships, and competitions to elevate your skills
                            and connect with professionals.
                        </p>
                        <button
                            onClick={handleJoinNowClick}
                            className="mt-6 flex items-center justify-center bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-900">
                            Join Now
                            <span className="ml-2">↗️</span> {/* Arrow icon */}
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default InviteSection;