import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { CiHeart } from "react-icons/ci";

import './Movie.css'
import { movieDataState } from '../../Store/Atoms/movieAtom';
import { useRecoilState } from 'recoil';
import { imageUrl } from '../../urls/urls';
import axios from '../../axios/axios';



const Movie = () => {

    const [movie, setMovie] = useRecoilState(movieDataState)

    const handleFavoriteMovie = async (id) => {
        const token = localStorage.getItem("jwt_token")
        if (!token) {
            alert("Please log in ");
            return;

        }
        try {
           
            const response = await axios.post(`/api/v1/movie/${id}/favorite`, {
                mediaTitle: movie.title,
                mediaImage: movie.backdrop_path
            },
            {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
                }
              }
            )

            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
        

    }

    return (
        <>
            {
                movie ? (
                    <section className='movie_box py-4' style={{ backgroundImage: `linear-gradient(250deg, var(--linear_color1) 0%, var(--linear_color2) 66%), url(${imageUrl + movie.backdrop_path})` }}>
                        <Container className='py-4 mt-4'>
                            <div className="movie_container">
                                <Row>
                                    <Col lg={6} className='img_container'>
                                        <img src={`${imageUrl + movie.backdrop_path} `} className='movie_img' alt="avatar-image" />
                                    </Col>

                                    <Col lg={6}>
                                        <div className="movie_title text-start mt-3 mt-lg-0">
                                            <h1 className='text-capitalize '>{movie.title}</h1>
                                        </div>
                                        <p className='mt-3 mt-lg-4'>
                                            {movie.overview}
                                        </p>


                                        <div className="button_group mt-lg-4">
                                            <button onClick={() => handleFavoriteMovie(movie.id)}>
                                                <span className="favorite_icon me-1">
                                                    <CiHeart />
                                                </span>
                                                Add To Favorite
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>

                    </section>
                ) : null
            }
        </>
    )
}

export default Movie
