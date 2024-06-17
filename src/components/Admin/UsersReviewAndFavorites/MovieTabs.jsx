import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieReviews from './MovieReviews';
import FavoriteMovies from './FavoriteMovies';
import './MovieTabs.css'
import { Container } from 'react-bootstrap';


const MovieTabs = () => {
    const [activeTab, setActiveTab] = useState('Reviews'); // Initial active tab

   

    const handleClick = (tabName) => {
        setActiveTab(tabName);
    };



    const displayedContent = () => {
        switch (activeTab) {
            case 'Reviews':
                return <MovieReviews />;
            case 'Favorites':
                return <FavoriteMovies />;
            default:
                return null; // Handle unexpected tab states (optional)
        }
    };

    return (
        <div className="movie-tabs-container py-2 px-1 w-100 ">
            <Container>
                <div className="movie-tabs d-flex flex-row justify-content-center align-items-center justify-content-md-end align-items-md-end mt-5 mb-2 gap-2">
                    <button className={activeTab === 'Reviews' ? 'active' : ''} onClick={() => handleClick('Reviews')}>
                        Reviews
                    </button>

                    <button className={activeTab === 'Favorites' ? 'active' : ''} onClick={() => handleClick('Favorites')}>
                        Favorites
                    </button>
                </div>
                {displayedContent()}
            </Container>
        </div>
    );
};

export default MovieTabs;
