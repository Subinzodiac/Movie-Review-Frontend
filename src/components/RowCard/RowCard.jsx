import React from 'react';
import './RowCard.css'; // Import the updated CSS file
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import useMovieFetch from '../../hooks/useMovieFetch';
import { imageUrl } from '../../urls/urls';
import { useRecoilState } from 'recoil';
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom';

const RowCard = ({ title, url }) => {
  const [activeLink, setActiveLink] = useRecoilState(activeLinkState);
  const movies = useMovieFetch({ url });

  const handleClick = (movieId) => {
    window.scrollTo(0, 0);
    setActiveLink('movie');
  };

  return (
    <section className='row_posters'>
      <Container>
        <h2 className='text-uppercase mb-3'>
          <span className='text_underline'>{title}</span>
        </h2>
        <div className='movie_collection mt-4'>
          {movies && movies.map((movie) => (
            <article className='movie_card' key={movie.id}>
              <img src={`${imageUrl + movie.backdrop_path}`} alt='movie-image' />
              <div className='title text-center'>
                <Link to={`/movies/${movie.id}`} className='text-decoration-none' onClick={() => handleClick(movie.id)}>
                  <h6>{movie.title}</h6>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RowCard;
