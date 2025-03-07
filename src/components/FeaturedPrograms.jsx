/*
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core Swiper

const CardGrid = ({ items }) => {
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
                {items.map((item, index) => (
                    <SwiperSlide key={index} className="px-2">
                        <div className="p-4 shadow-lg rounded-lg bg-white h-full">
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p>{item.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex space-x-2">
                                    {item.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2">
                                        {tag}
                                    </span>
                                    ))}
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {item.buttonText}
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
*/
