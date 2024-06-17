import React from 'react'
import Banner from '../components/Banner/Banner'
import RowCard from '../components/RowCard/RowCard'
import { actionMovies, adventureMovies, animationMovies, comedyMovies, crimeMovies, fantasyMovies } from '../urls/urls'

const Movies = () => {
  return (
    <div className='movies_section'>
      <Banner url={adventureMovies}/>
      <RowCard title = 'action' url={actionMovies} />
      <RowCard title = 'adventure' url={adventureMovies}/>
      <RowCard title = 'animation' url={animationMovies}/>
      <RowCard title = 'comedy' url={comedyMovies}/>
      <RowCard title = 'fantasy' url={fantasyMovies}/>
      <RowCard title = 'crime' url={crimeMovies}/>
    </div>
  )
}

export default Movies
