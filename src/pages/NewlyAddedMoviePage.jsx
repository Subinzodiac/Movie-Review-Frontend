import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Reviews from '../components/Reviews/Reviews'
import { CiHeart } from 'react-icons/ci'

import { useLoaderData } from 'react-router-dom'
import axios from '../axios/axios'

import '../components/SingleMovieDetails/Movie.css'
import '../Styles/NewlyAddedMoviePage.css'
import { useRecoilState } from 'recoil'
import { movieDataState } from '../Store/Atoms/movieAtom'
import AllReviews from '../components/AllReviews/AllReviews'

export async function loader({ params }) {
    console.log(params)
    const response = await axios.get(`/api/v1/admin/movies/${params.movieId}`);
    const data = response.data
    return { data };
}

const NewlyAddedMoviePage = () => {
    const [movie, setMovie] = useRecoilState(movieDataState)


    const { data } = useLoaderData()
    console.log(data)

    

    useEffect(() => {
        if (data) {
            setMovie(data)
        }
    }, [data])

    const handleFavoriteMovie = async (id) => {
        const token = localStorage.getItem("jwt_token")
        if (!token) {
            alert("Please log in ");
            return;

        }
        try {
           
            const response = await axios.post(`/api/v1/movie/${id}/favorite`, {
                mediaTitle: movie.title,
                mediaImage: movie?.mediaImage || movie?.mediaImageUrl
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
        movie ? (
            <section>
                <div className='movie_box py-4' style={{ backgroundImage: `linear-gradient(250deg, var(--linear_color1) 0%, var(--linear_color2) 66%), url(${movie?.mediaImage || movie?.mediaImageUrl})` }}>
                    <Container className='py-4 mt-4'>
                        <div className="movie_container">
                            <Row>
                                <Col lg={6} className='img_container'>
                                    <img src={movie?.mediaImage || movie?.mediaImageUrl} className='movie_img' alt="avatar-image" />
                                </Col>

                                <Col lg={6}>
                                    <div className="movie_title text-start mt-3 mt-lg-0">
                                        <h1 className='text-capitalize '>{movie.title}</h1>
                                    </div>
                                    <p className='mt-3 mt-lg-4'>
                                        {movie.mediaDescription}
                                    </p>

                                    <div className="button_group mt-lg-4">
                                        <button onClick={() => handleFavoriteMovie(movie.id)} >
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

                </div>
                <div className="image_section py-2 py-lg-3">
                    <Container>
                        <div className='image_container'>
                            <div className="image_header">
                                <h2>Images</h2>
                            </div>
                            <div>

                                <article>
                                    <div className='image_box'>
                                        <img src={movie?.mediaImage || movie?.mediaImageUrl} alt="avatar-image" className='img' />
                                    </div>
                                </article>


                            </div>
                        </div>
                    </Container>
                </div>
                <div className='Review_section py-2 py-lg-3'>
                    <AllReviews />

                  <Reviews />
                </div>
            </section>
        ) : null
    )
}

export default NewlyAddedMoviePage
