import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import BottomNavbar from './components/BottomNavbar.jsx';
import Internship from './pages/Internship';
import Mentorship from './pages/Mentorship';
import Workshop from './pages/Workshop';
import Compete from './pages/Compete';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import CalendarPage from './pages/CalendarPage';
import UserProfile from './pages/UserProfile';
import './App.css';
import './index.css';

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

function App() {
    return (
        <Routes>
            {/* Frontend Routes */}
            <Route
                path="/*"
                element={
                    <div>
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/internships" element={<Internship />} />
                                <Route path="/mentorship" element={<Mentorship />} />
                                <Route path="/workshops" element={<Workshop />} />
                                <Route path="/compete" element={<Compete />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </main>
                        <Footer />
                        <BottomNavbar />
                    </div>
                }
            />

            {/* Dashboard Routes */}
            <Route path="/dashboard/*" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="profile" element={<UserProfile />} />


            </Route>
        </Routes>
    );
}

export default AppWrapper;