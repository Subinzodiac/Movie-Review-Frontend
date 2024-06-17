import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './MovieReviews.css';
import axios from '../../../axios/axios';

const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/admin/users/${userId}/reviews`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                setReviews(response.data);
            } catch (error) {
                console.log("Fetching error: ", error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <section className='movieReviews_section py-4'>
            <Container>
                <div className="review_container px-4 py-4">
                    <div className="main_header mb-4">
                        <h1 className='text-capitalize'>List of Reviews</h1>
                    </div>

                    {reviews && reviews.map((review) => (
                        <div className="review_content mb-5" key={review.id}>
                            <h2 className='review_header mb-3'>{review.mediaTitle}</h2>
                            <p className='review_para'>{review.content}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default MovieReviews;
