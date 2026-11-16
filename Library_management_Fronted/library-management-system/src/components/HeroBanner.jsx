import React from 'react';

const HeroBanner = () => {
    return (
        <div
            className="hero min-h-[500px]"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1758726535099-5b7ff51bcc55?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Your Library, Smarter & Simpler</h1>
                    <p className="mb-5">
                        Discover books, manage borrowing, and keep track of your reading—all in one simple and organized library system.
                    </p>
                    <button className="btn btn-primary">Explore Books</button>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;