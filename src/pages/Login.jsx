import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';


function Login() {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <>
            <div className="bg-white text-center p-4 shadow-md">
                <h3 className="text-lg font-semibold">Why Join Us?</h3>
                <p>Explore opportunities, connect with professionals, and grow your skills.</p>
            </div>
            <main className="container mx-auto px-4 py-12">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
                    {isLoginView ? (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-blue-900">Sign In</h2>
                                <p className="text-gray-600">Log in to post and access opportunities</p>
                            </div>

                            <LoginForm/>
                            <hr className="my-6 border-t"/>
                            <p className="text-center">
                                No account? <button onClick={() => setIsLoginView(false)}
                                                    className="text-blue-500 hover:text-blue-700">Sign up</button>
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-blue-900">Sign Up</h2>
                                <p className="text-gray-600">Sign up to post and access opportunities</p>
                            </div>

                            <SignUpForm/>
                            <hr className="my-6 border-t"/>
                            <p className="text-center">
                                Have an account? <button onClick={() => setIsLoginView(true)}
                                                         className="text-blue-500 hover:text-blue-700">Log in</button>
                            </p>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

export default Login;
