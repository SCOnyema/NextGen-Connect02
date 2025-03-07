import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoCalendarOutline, IoPersonOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';

const Sidebar = ({ onLogout }) => {
    return (
        <div className="bg-white text-[#333333] h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic text-blue-900'>NextGen Connect</h1>
            <ul className='flex flex-col mt-5 text-xl'>
                <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-900 hover:text-white'>
                    <Link to="/dashboard" className="flex items-center space-x-4">
                        <IoHomeOutline />
                        <span className='hidden md:inline'>Dashboard</span>
                    </Link>
                </li>
                <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-900">
                    <Link to="/dashboard/calendar" className="flex items-center space-x-4">
                        <IoCalendarOutline />
                        <span className="hidden md:inline">Calendar</span>
                    </Link>
                </li>
                <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-900">
                    <Link to="/dashboard/profile" className="flex items-center space-x-4">
                        <IoPersonOutline />
                        <span className="hidden md:inline">Profile</span>
                    </Link>
                </li>
                <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-900">
                    <Link to="/dashboard/settings" className="flex items-center space-x-4">
                        <IoSettingsOutline />
                        <span className="hidden md:inline">Settings</span>
                    </Link>
                </li>
                {/* Logout Button */}
                <li
                    className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-900"
                    onClick={onLogout} // Trigger logout function
                >
                    <div className="flex items-center space-x-4">
                        <IoLogOutOutline />
                        <span className="hidden md:inline">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;