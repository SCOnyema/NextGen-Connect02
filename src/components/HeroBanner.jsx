import React from 'react';
import { useNavigate } from "react-router-dom";

function HeroBanner({ title, subtitle, image }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/login');
    }

    return (
        <div className="relative">

            <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-50"/>
            <div className="relative flex items-center justify-center h-full">
                <div className="text-center md:text-left p-4 bg-black bg-opacity-50 rounded-lg m-4 md:max-w-3xl md:mx-auto">
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    <p className="text-white mt-2">{subtitle}</p>
                    <button
                        onClick={handleNavigate}
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Explore Opportunities
                    </button>
                </div>
            </div>
        </div>
    );
}


export default HeroBanner;