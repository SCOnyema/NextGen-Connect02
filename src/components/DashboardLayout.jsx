import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
    const navigate = useNavigate();

    // logout function
    const handleLogout = async () => {
        try {
            await signOut(auth); // sign out the user
            console.log("User signed out");
            navigate("/"); // redirect to home page
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-16 md:w-64 flex-shrink-0">
                <Sidebar onLogout={handleLogout} />
            </div>
            <div className="flex flex-col flex-grow">
                <Header/>
                <main className="flex-grow p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;