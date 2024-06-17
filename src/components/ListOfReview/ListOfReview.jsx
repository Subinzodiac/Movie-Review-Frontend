import React, { useEffect, useState } from 'react'

import './ListOfReview.css'
import { Container } from 'react-bootstrap'
import axios from '../../axios/axios'
import NoReviews from '../NoReviews/NoReviews'

const ListOfReview = () => {

  const [reviews, setReviews] = useState([])
  const [isReview, setIsReview] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/user/reviews', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
          }
        })
        
        setReviews(response.data)
        setIsReview(true)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    
      isReview ? (
    
     <section className = 'listOfReview_section pt-5 px-5 pb-5' >
          <Container>
            <h1 className='review_header text-start text-sm-center'>Your Reviews</h1>
            {
              reviews && reviews.map((review) => {
                return (
                  <div className="listOfReview_box d-flex flex-column  justify-content-start align-items-start gap-2 pt-5  pb-sm-4" key={review.id}>
                    <div className="first_part">

                      <h2 className=''>{review.mediaTitle}</h2>
                    </div>

                    <div className="second_part flex-0.5 py-sm-3">
                      <p>{review.content}</p>
                    </div>

                  </div>

                )
              })

            }


          </Container>
      </section >
  ) : <NoReviews />

 

  )
}

export default ListOfReview
