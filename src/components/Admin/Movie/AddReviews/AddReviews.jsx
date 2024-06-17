import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import './AddReviews.css'
import { CiLocationArrow1 } from 'react-icons/ci'
import axios from '../../../../axios/axios'
import { useRecoilState } from 'recoil'
import { movieDataState } from '../../../../Store/Atoms/movieAtom'


const AddReviews = () => {
    const [movie, setMovie] = useRecoilState(movieDataState)
    const [content, setContent] = useState('')
    const [rate, setRate] = useState('')



    const handleSubmit = async (event) => {
      console.log(movie.id)
        event.preventDefault();
      
        const token = localStorage.getItem("jwt_token");
    
        console.log(token)
      
        if (!token) {
          alert("Please log in to submit a review");
          setContent("");
          setRate("")
          return; 
        }
      
        try {
          const response = await axios.post(`/api/v1/movie/${movie.id}/reviews`, {
            content: content,
            mediaRating: rate,
            mediaTitle: movie.title
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          });
      
          if (response.status === 201) {
            alert("Review posted successfully");
            setContent("");
            setRate("")
            window.location.reload()
          } else {
            console.error("Error submitting review:", response.data);
            alert("An error occurred. Please try again."); // More specific message based on response
          }
        } catch (error) {
          console.error("Error submitting review:", error);
          alert("An error occurred. Please try again."); // User-friendly error message
        } 
    };
    
      

   
  return (
    <div className='addReviews'>
        <Container>
        <div className="review_posting_section">
                    <div className="review_post_box">
                        <h4 className='text-capitalize'>Post Your Reviews</h4>
                        <div className="form_container">
                            <form action="" onSubmit={handleSubmit}>
                                <textarea
                                    id=""
                                    cols="30"
                                    rows="5"
                                    placeholder='write your reviews...'
                                    name='content'
                                    value={content}
                                    onChange={(event) => {
                                      setContent(event.target.value)
                                    }}
                                    required
                                    className='text-capitalize'
                                >
                                </textarea>
                                <div className='review_group'>
                                    <div className="input_group d-flex flex-column">
                                        <label htmlFor="rate">Rate the movie : </label>
                                        <input 
                                           type="number" 
                                           name='rate' 
                                           value={rate} 
                                           max={5}
                                           onChange={(event) => {
                                            const newValue = Math.min(event.target.value, 5);
                                            setRate(newValue)}} 
                                           required 
                                        />
                                        <small className='mt-1'>Rate the movie out of 5</small>
                                    </div>
                                    <div className='post_button'>
                                        <button type='submit'>
                                            <span className='post_icon me-1'>
                                                <CiLocationArrow1 />
                                            </span>
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </Container>
      
    </div>
  )
}

export default AddReviews
