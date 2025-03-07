import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EventCard from './EventCard';

const EventGridSwipe = ({ events, onRegister }) => {
    return (
        <div className="w-full overflow-hidden max-w-full">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {events.map((event) => {
                    console.log("Rendering event:", event); // Debugging: Check each event object
                    return (
                        <SwiperSlide key={event.id} className="!w-72">
                            <EventCard event={event} onRegister={onRegister} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default EventGridSwipe;