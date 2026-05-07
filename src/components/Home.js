import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container d-flex justify-content-center align-items-center">

            {/* FLOATING ICON */}
            <div className="floating-icon">
                <i class="fa-regular fa-newspaper"></i>
            </div>

            {/* CENTER CONTENT */}
            <div className="text-center content-box">

                <h1 className="main-title">
                    Aapki News
                </h1>

                <p className="sub-title">
                    Stay updated with the latest headlines from around the world.
                    Get real-time news in categories like Business, Sports, Technology and more.
                </p>

            </div>

        </div>
    );
};

export default Home;