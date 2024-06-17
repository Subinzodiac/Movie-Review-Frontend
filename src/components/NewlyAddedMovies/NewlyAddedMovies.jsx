import React, { useEffect, useState } from 'react'
import '../RowCard/RowCard.css'
import { Container } from 'react-bootstrap'
import axios from '../../axios/axios'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom'


const NewlyAddedMovies = ({title}) => {

    const [movies, setMovies] = useState([])
    const [activeLink, setActiveLink] = useRecoilState(activeLinkState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/admin/movies')
                setMovies(response.data)
            } catch (error) {
                console.log("Fetching Error: ",error)

            }
        }
        fetchData();
    },[])

    const handleClick = (movieId) => {
        window.scrollTo(0, 0);
        setActiveLink("movie")
    };

  return (
    <div>
       <section className='row_posters'>
            <Container>
                <h2 className='text-uppercase mb-3'>
                    <span className='text_underline'>{title}</span>
                </h2>
                <div className='movie_collection mt-4'>
                    {
                        movies && movies.map((movie) => {
                            return (
                                <article className='movie_card' key={movie.id}>
                                    <img src={movie?.mediaImageUrl || movie?.mediaImage} alt="movie-image" />
                                    <div className="title text-center ">
                                        <Link to={`/addedMovies/${movie.id}`} className='text-decoration-none' onClick={() => {handleClick(movie.Id)}}>
                                            <h6>{movie.title}</h6>
                                        </Link>
                                    </div>
                                </article>
                            )
                        })
                    }
                   
                </div>
            </Container>
        </section>
    </div>
  )
}

export default NewlyAddedMovies
