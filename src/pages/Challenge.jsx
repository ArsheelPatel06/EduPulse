import React from 'react';
import Navbar from '../components/Navbar';

const Challenge = () => {
    return (
        <div className="min-h-screen bg-base text-main transition-colors duration-300">
            <Navbar />
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <h1 className="text-4xl font-bold">Active Challenge</h1>
            </div>
        </div>
    );
};

export default Challenge;
