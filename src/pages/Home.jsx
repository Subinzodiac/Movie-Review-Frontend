import React from 'react'
import Banner from '../components/Banner/Banner'
import RowCard from '../components/RowCard/RowCard'
import { newlyAddedMovies, nowPlayingMovies, popularMovies, topRatedMovies } from '../urls/urls'
import NewlyAddedMovies from '../components/NewlyAddedMovies/NewlyAddedMovies'

const Home = () => {
  return (
    <div className='home'>
        <Banner url={popularMovies}/>
        <RowCard title="Popular" url={popularMovies} />
        <RowCard title="Trending" url={topRatedMovies} />
        <RowCard title="Top-Rated" url={nowPlayingMovies}/>
        <NewlyAddedMovies title="Newly Added" url={newlyAddedMovies} />
    </div>
  )
}

export default Home
