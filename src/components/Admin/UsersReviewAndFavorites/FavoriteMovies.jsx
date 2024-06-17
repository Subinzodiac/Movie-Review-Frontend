import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'
import './FavoriteMovies.css'
import axios from '../../../axios/axios'
import { imageUrl } from '../../../urls/urls'

const FavoriteMovies = () => {
    const [favorites, setFavorites] = useState([])
    const { userId } = useParams()


    useEffect(() => {
        const token = localStorage.getItem("jwt_token")
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/admin/users/${userId}/favorites`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token} `
                    }
                })

                setFavorites(response.data)
            } catch (error) {
                console.log("fetching error: ", error)
            }
        }

        fetchData()
    }, [])

    
    return (
        <section className='favoriteMovies_section py-2'>
            <Container>
                <div className="favorite_container py-4 px-3">
                    <div className="main_header mt-2">
                        <h1 className='text-capitalize'>List of Favorite Movies</h1>
                    </div>
                    <div className="movie_row  py-5 mt-3">
                        <Row className='g-3 gx-md-0 gy-md-3'>
                            {
                                favorites.map((favorite) => {
                                    return (
                                        <Col xl={3} lg={4} md={6} key={favorite.id}>
                                            <Card className='w-75'>
                                                <Card.Img src={favorite.mediaImage.startsWith('/') ? `${imageUrl}${favorite.mediaImage}` : favorite.mediaImage} alt="Card image" />
                                                <Card.ImgOverlay className="d-flex justify-content-center align-items-end">
                                                    <Card.Text>{favorite.mediaTitle}</Card.Text>
                                                </Card.ImgOverlay>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default FavoriteMovies
