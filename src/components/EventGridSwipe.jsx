import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EventCard from './EventCard';

const EventGridSwipe = ({ events, onRegister }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 ">
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                breakpoints={{

                    640: {
                        slidesPerView: 2,
                        spaceBetween: 24
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    }
                }}
            >
                {events.map((event) => (
                    <SwiperSlide key={event.id} className="!h-auto">

                        <EventCard event={event} onRegister={onRegister} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};



export default EventGridSwipe;