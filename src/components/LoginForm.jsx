import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(''); // handle the login error message
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginError('');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('Logged in user:', user.uid); // log the user ID for debugging
                navigate('/dashboard'); // Redirect the user to the dashboard after successful login
                onLogin(user); //handle successful user login
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error during login:', errorMessage);
                // Handle and display the error message to the user
                switch (errorCode) {
                    case 'auth/invalid-credential':
                        setLoginError('Wrong password. Please try again.');
                        break;
                    case 'auth/user-not-found':
                        setLoginError('Email does not match any account. Please sign up.');
                        break;
                    case 'auth/invalid-email':
                        setLoginError('Invalid email format.');
                        break;
                    default:
                        setLoginError('Login failed. Please try again.');
                        break;
                }
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
            {loginError && <p className="text-red-500 text-xs italic">{loginError}</p>}
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
