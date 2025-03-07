import React from 'react';
import {Link} from 'react-router-dom';
import HomeIcon from '../assets/icons/home-icon.svg'
import InternIcon from '../assets/icons/intern-icon.svg'
import MentorIcon from '../assets/icons/mentorship.svg'
import WorkshopIcon from '../assets/icons/workshop-icon.svg'
import CompeteIcon from '../assets/icons/compete-icon.svg'


function BottomNavbar() {
    return (
        <div className="fixed bottom-0 w-full bg-white border-t shadow-md md:hidden">
            <div className="flex justify-around py-2">
                <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-600">

                    <img src={HomeIcon} alt="Home" className="w-6 h-6 mb-1"/>
                    <span className="text-xs">Home</span>
                </Link>
                <Link to="/internships" className="flex flex-col items-center text-gray-600 hover:text-blue-600">

                    <img src={InternIcon} alt="Internship" className="w-6 h-6 mb-1"/>
                    <span className="text-xs">Internship</span>
                </Link>
                <Link to="/mentorship" className="flex flex-col items-center text-gray-600 hover:text-blue-600">

                    <img src={MentorIcon} alt="Mentorship" className="w-6 h-6 mb-1"/>
                    <span className="text-xs">Mentorship</span>
                </Link>
                <Link to="/workshops" className="flex flex-col items-center text-gray-600 hover:text-blue-600">

                    <img src={WorkshopIcon} alt="WorkShop" className="w-6 h-6 mb-1"/>
                    <span className="text-xs">Workshop</span>
                </Link>
                <Link to="/compete" className="flex flex-col items-center text-gray-600 hover:text-blue-600">

                    <img src={CompeteIcon} alt="Compete" className="w-6 h-6 mb-1"/>
                    <span className="text-xs">Compete</span>
                </Link>
            </div>
        </div>
    );
}

export default BottomNavbar;