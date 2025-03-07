import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('Logged in user:', user.uid); // Optional: Log the user ID for debugging
                navigate('/dashboard'); // Redirect the user to the dashboard after successful login
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error during login:', errorMessage);
                // Optionally display the error message to the user
            });
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded shadow-sm"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded shadow-sm"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Log in
            </button>
        </form>
    );
}

export default LoginForm;
