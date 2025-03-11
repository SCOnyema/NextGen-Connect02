import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {db, auth } from "../firebaseConfig";


const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchUserData();

            } else {
                setUser(false);
            }
        });


        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userRef = doc(db, "Users", auth.currentUser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const userProfile = {
                        name: userData.name || '',
                        email: userData.email || '',
                        bio: userData.bio || '',
                        linkedinUrl: userData.linkedinUrl || '',
                    };
                    setUser(userProfile);
                    setFormData(userProfile);
                }else{
                    console.log("No user data available");
                }
                setIsEditing(false);
            }
        };
        return () => unsubscribe();
    },[]);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userRef = doc(db, "Users", auth.currentUser.uid);
        await updateDoc(userRef, formData);
        setUser(formData);
        setIsEditing(false);
    };

    if (!user) return <div> Loading...</div>;

    return (
        <div className="p-4">
            {!isEditing ? (
                <div className="bg-white shadow rounded-lg p-4 mt-8 mb-8">
                    <h2 className="text-xl font-bold">Profile</h2>
                    <div className="space-y-4 mt-6">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Bio:</strong> {user.bio}</p>
                    <p><strong>LinkedIn:</strong> <a href={user.linkedinUrl} target="_blank"
                                                     rel="noopener noreferrer">{user.linkedinUrl}</a></p>
                    </div>
                    <button onClick={handleEdit} className="mt-8 bg-blue-500 text-white rounded-full px-4 py-2">Edit
                        Profile
                    </button>
                </div>
            ) : (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg w-full p-6 max-w-md">
                        <h2 className="text-xl font-bold mb-4"> Edit Profile </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                className="block w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder=" Email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                className="block w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            <textarea
                                name="bio"
                                placeholder=" Bio"
                                value={formData.bio || ''}
                                onChange={handleInputChange}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="url"
                                name="linkedinUrl"
                                placeholder=" LinkedIn"
                                value={formData.linkedinUrl || ''}
                                onChange={handleInputChange}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white rounded-full px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white rounded-full px-4 py-2"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );

};

export default UserProfile;