import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import './AllReviews.css'
import axios from '../../axios/axios'


const AllReviews = () => {


    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([])
    const [isReview, setIsReview] = useState(false)
    const { movieId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/movie/${movieId}/otherReviews`)
                setReviews(response.data.reviews)
                setUsers(response.data.users)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (reviews.length > 0) {
            setIsReview(true)
        }
    }, [reviews])

    return (
        isReview ? (
            <div className='othersReview_section py-5 py-2 px-3'>
                <Container>
                    <div className="othersReview_container px-1 px-lg-5 py-lg-3">
                        <h1 className='text-capitalize main_header'>Others Reviews</h1>

                        {
                            reviews && reviews.map((review) => {

                                const user = users && users.find(usersArray => usersArray[0].id === review.user);

                                const username = user ? user[0].username : "Unknown User";

                                return (
                                    <article className="othersReview_content mt-5" key={review.id}>
                                        <div className="header mt-2  ">
                                            <div className='d-flex flex-row justify-content-start align-items-center gap-1'>
                                                <span className='user_badge align-self-start'>{username[0]}</span>
                                                <div className='d-flex flex-column gap-1 justify-content-start align-items-start '>
                                                    <h3 className='text-capitalize ms-2'>{username}</h3>
                                                    <p className='px-2'>Critic's Rating: {review.mediaRating}/5</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="para mt-3 px-0 py-2">
                                            <p>{review.content}</p>
                                        </div>
                                    </article>
                                );
                            })
                        }
                    </div>
                </Container>

            </div>

        ) : null

    )
}

export default AllReviews
