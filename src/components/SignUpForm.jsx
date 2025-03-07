import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebaseConfig";
import { doc, setDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignUpForm({ onSignUp }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError('')
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // store additional user details in Firestore
            await setDoc(doc(db, "Users", user.uid), {
                name: name,
                email: email,
                role: role,
            });

            console.log('User registered with ID:', user.uid);
            navigate('/dashboard');

        } catch (error) {
            console.error('Error signing up:', error.message);
            setError(error.message); // display error message to user
        }
    };

    return (
        <form onSubmit={handleSignUp} className="space-y-4">
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <input
                type="text" placeholder="Name" required className="w-full px-4 py-2 border rounded shadow-sm" onChange={(e) => setName(e.target.value)}/>
            <input
                type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded shadow-sm" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded shadow-sm" onChange={(e) => setPassword(e.target.value)}/>
            <select
                value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 border rounded shadow-sm">
                <option value="Student">Student</option>
                <option value="Organizer">Organizer</option>
            </select>
            <button
                type="submit" className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign up
            </button>
        </form>
    );
}

export default SignUpForm;
