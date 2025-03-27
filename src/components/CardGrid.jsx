import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core Swiper
import { useNavigate } from 'react-router-dom';

const CardGrid = ({ events }) => {

    const navigate = useNavigate(); // Initialize navigate

    const handleRedirect = () => {
        navigate('/login', {
            state: {
                from: 'event-registration',
                message: "Please login to register for events"
            }
        });
    };

    return (
        <div className="pt-4 pb-8">

            <Swiper
                spaceBetween={10} // Reduced space between slides for better mobile viewing
                slidesPerView={1} // Start with 1 slide per view by default
                loop={false} // Enable looping
                breakpoints={{

                    320: {
                        slidesPerView: 1, // 1 slide per view on small mobile devices
                        spaceBetween: 10 // Less space for smaller screens
                    },
                    640: {
                        slidesPerView: 2, // 2 slides per view on mid-size screens
                        spaceBetween: 20 // More space between slides
                    },
                    1024: {
                        slidesPerView: 3, // 3 slides per view on desktops
                        spaceBetween: 30 // Standard space
                    },



                }}
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index} className="px-2">
                        <div className="p-4 shadow-lg rounded-lg bg-white h-full">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p>{event.description}</p>
                            <div className="mt-4 text-sm text-gray-500">{event.date}{/* • {event.location}*/}</div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2">
                                        {event.location}
                                </span>
                                <button
                                    onClick={handleRedirect}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Register
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </div>

    );
};

export default CardGrid;
