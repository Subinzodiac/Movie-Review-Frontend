import React from 'react'
import { Container } from 'react-bootstrap'
import './NoReviews.css'

const NoReviews = () => {
  return (
    <div className='noReview_section py-5 '>
        <Container>
            <div className='content d-flex justify-content-center align-items-center'>
                <h1>No Reviews have been added yet!</h1>
            </div>
        </Container>
      
    </div>
  )
}

export default NoReviews
