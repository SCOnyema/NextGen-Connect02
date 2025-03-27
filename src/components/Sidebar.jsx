import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoCalendarOutline, IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';

const Sidebar = ({ onLogout }) => {
    return (
        <div className="bg-white text-[#333333] h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic text-blue-900'>NextGen Connect</h1>
            <ul className='flex flex-col mt-5 text-xl'>
                {/* Dashboard */}
                <Link to="/dashboard" className="hover:bg-blue-900 hover:text-white">
                    <li className='flex items-center py-3 px-2 space-x-4 cursor-pointer'>
                        <IoHomeOutline />
                        <span className='hidden md:inline'>Dashboard</span>
                    </li>
                </Link>

                {/* Calendar */}
                <Link to="/dashboard/calendar" className="hover:bg-blue-900 hover:text-white">
                    <li className="flex items-center py-3 px-2 space-x-4 cursor-pointer">
                        <IoCalendarOutline />
                        <span className="hidden md:inline">Calendar</span>
                    </li>
                </Link>

                {/* Profile */}
                <Link to="/dashboard/profile" className="hover:bg-blue-900 hover:text-white">
                    <li className="flex items-center py-3 px-2 space-x-4 cursor-pointer">
                        <IoPersonOutline />
                        <span className="hidden md:inline">Profile</span>
                    </li>
                </Link>

                {/* Logout Button */}
                <li
                    onClick={onLogout} // Trigger logout function
                    className="flex items-center py-3 px-2 space-x-4 hover:bg-blue-900 hover:text-white cursor-pointer"
                >
                    <IoLogOutOutline />
                    <span className="hidden md:inline">Logout</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;