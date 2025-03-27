import React, { useState, useEffect }from 'react';
import logo from '../assets/logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Detect auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true); // User is logged in
            } else {
                setIsLoggedIn(false); // User is logged out
            }
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <nav className="bg-blue-900 text-white py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div>
                    <Link to="/">
                    <img src={logo} alt="Logo" className="h-8 w-auto md:h-10" />
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-10">
                    <button onClick={() => handleNavigate('/internships')} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Internship</button>
                    <button onClick={() => handleNavigate('/mentorship')} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mentorship</button>
                    <button onClick={() => handleNavigate('/workshops')} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Workshop</button>
                    <button onClick={() => handleNavigate('/compete')} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Compete</button>
                </div>

                {/* Conditional rendering for Login/Dashboard */}
                <div>
                    {isLoggedIn ? (
                        <button onClick={() => handleNavigate('/dashboard')} className="bg-white text-blue-900 px-4 py-2 rounded-full ml-4 hover:bg-blue-100 transition-colors">
                            Dashboard
                        </button>
                    ) : (
                        <button onClick={() => handleNavigate('/login')} className="bg-white text-blue-900 px-4 py-2 rounded-full ml-4 hover:bg-blue-100 transition-colors">
                            Login
                        </button>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
