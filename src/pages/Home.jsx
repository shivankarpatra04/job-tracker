// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Job Application Tracker
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Keep track of your job applications, interviews, and offers all in one place.
                    </p>

                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        {!user ? (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:text-lg"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:text-lg"
                            >
                                Go to Dashboard
                            </button>
                        )}
                    </div>

                    {/* Feature Highlights */}
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 mb-2">
                                <svg
                                    className="h-8 w-8 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Track Applications</h3>
                            <p className="text-gray-600">
                                Keep all your job applications organized in one place.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 mb-2">
                                <svg
                                    className="h-8 w-8 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Manage Interviews</h3>
                            <p className="text-gray-600">
                                Never miss an interview with our scheduling system.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 mb-2">
                                <svg
                                    className="h-8 w-8 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                            <p className="text-gray-600">
                                Visualize your job search progress with analytics.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16">
                        <p className="text-gray-600 mb-4">
                            Join thousands of job seekers who have successfully landed their dream jobs using our platform.
                        </p>
                        {!user && (
                            <button
                                onClick={() => navigate('/register')}
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                                Get Started Today
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;