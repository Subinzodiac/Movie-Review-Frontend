import React, { useEffect, useRef, useState } from 'react'

import Container from 'react-bootstrap/Container'

import { MdDeleteOutline } from "react-icons/md";


import './Reviews.css'
import AddReviews from '../Admin/Movie/AddReviews/AddReviews';
import axios from '../../axios/axios';
import { useRecoilState } from 'recoil';
import { movieDataState } from '../../Store/Atoms/movieAtom';



const Reviews = () => {

    const [movie, setMovie] = useRecoilState(movieDataState)

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        let isMounted = true;

        if (movie) {
            const fetchData = async () => {
                console.log("Fetching reviews");
                try {
                    const response = await axios.get(`/api/v1/movie/${movie.id}/reviews`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                        }
                    });

                    if (isMounted) {
                        setReviews(response.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }


        return () => {
            isMounted = false;
        };
    }, [movie]);




    const handleDeleteMovie = async (id) => {
        console.log(id)
        try {
            console.log(id);
            const response = await axios.delete(`/api/v1/movie/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                }
            });

            alert(response.data.data)
            window.location.reload()
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("An error occurred while deleting the review. Please try again.");
        }
    };


    return (
        <>
            <section className='reviews'>
                <Container>
                    <div className='review_container'>
                        <div className='review_content py-sm-4 py-3'>
                            <h3>Reviews({reviews && reviews.length})</h3>
                            {
                                reviews ? (reviews.map((review) => {

                                    return (

                                        <div className="review_para" key={review.id}>
                                            <p>{review.content}</p>
                                            
                                            <button className="delete_button" onClick={() => handleDeleteMovie(review.id)}>
                                                <span className="delete_icon">
                                                    <MdDeleteOutline />
                                                </span>
                                            </button>
                                        </div>


                                    )
                                })) : null
                            }
                        </div>
                    </div>
                    <AddReviews />
                </Container>
            </section>

        </>

    )
}

export default Reviews
