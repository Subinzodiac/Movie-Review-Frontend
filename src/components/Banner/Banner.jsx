import React from 'react'

import { LuEye } from "react-icons/lu";

import Container from 'react-bootstrap/Container'

import './Banner.css'
import { Link } from 'react-router-dom';


import useSingleMovieFetch from '../../hooks/useSingleMovieFetch';
import { imageUrl } from '../../urls/urls';
import { useRecoilState } from 'recoil';
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom';

const Banner = ({url}) => {
    const [activeLink, setActiveLink] = useRecoilState(activeLinkState) 

    const movie = useSingleMovieFetch({url})
  
    return (
        <section className='banner_section d-flex flex-column pt-4' style={{backgroundImage: `linear-gradient(300deg, var(--linear_color1) 0%, var(--linear_color2) 66%), url(${movie && imageUrl + movie.backdrop_path})`}}>
            <Container>
                <div className="banner_content pt-2 pt-lg-5 px-2 mt-2 mt-lg-5">
                    <h1 className='movie_title mt-4'>{movie && movie.title}</h1>
                    <p className='movie_description mt-3'>
                        {movie && movie.overview} 
                    </p>
                    <div className='button_group mt-4 mb-3 pt-2 pb-5'>
                        <Link to={`/movies/${movie && movie.id}`}>
                        <button className='view_button mt-' onClick={() => setActiveLink('movie')}>
                            <LuEye /> View
                        </button>
                        </Link>
                    </div>
                </div>
            </Container>
           
        </section>
    )
}

export default Banner