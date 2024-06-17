import React, { useEffect } from 'react'
import Movie from '../components/SingleMovieDetails/Movie'
import MovieImageSwiper from '../components/MovieImageSwiper/MovieImageSwiper'
import MovieVideoSwiper from '../components/MovieVideoSwiper/MovieVideoSwiper'
import Reviews from '../components/Reviews/Reviews'
import RowCard from '../components/RowCard/RowCard'
import { useRecoilState } from 'recoil'
import { movieDataState } from '../Store/Atoms/movieAtom'
import axios from '../axios/axios'
import { useLoaderData } from 'react-router-dom'
import { actionMovies } from '../urls/urls'
import AllReviews from '../components/AllReviews/AllReviews'




export async function loader({ params }) {
    const response = await axios.get(`/api/v1/movie/${params.movieId}`);
    const data = response.data
    return { data };
}
const SingleMoviePage = () => {

    const [movie, setMovie] = useRecoilState(movieDataState)

    const { data } = useLoaderData()


    useEffect(() => {
        if (data) {
            setMovie(data)
        }
    }, [data])


    return (
        <div className='singleMovie_section'>
            <Movie />
            <MovieImageSwiper />
            <MovieVideoSwiper />
            <AllReviews />
            <Reviews />
            <RowCard title='You May Also Like' url={actionMovies} />
        </div>
    )
}

export default SingleMoviePage
