import React from 'react'
import { Container } from 'react-bootstrap'
import './NoFavorites.css'

const NoFavorites = () => {
  return (
    <div className='noFavorite_section py-5 '>
        <Container>
            <div className='content d-flex justify-content-center align-items-center'>
                <h1>No favorite movies have been added yet!</h1>

            </div>
        </Container>
      
    </div>
  )
}

export default NoFavorites
