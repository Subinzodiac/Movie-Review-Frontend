import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './MovieVideoSwiper.css'
import { movieDataState } from '../../Store/Atoms/movieAtom';
import { useRecoilState } from 'recoil';
import YouTube from 'react-youtube';
import axios from '../../axios/axios';

const MovieVideoSwiper = () => {

  const [movie, setMovie] = useRecoilState(movieDataState)

  const [video, setVideo] = useState(null)

  const [urlId, setUrlId] = useState(null)


  const opts = {
    height: '390',
    width: '100%',
   
  };

  useEffect(() => {
    if (movie) {
      axios.get(`/api/v1/movie/${movie.id}/videos`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setVideo(response.data.results)
        }
        else {
          console.log("Array is Empty...")
        }

      })
      .catch(error => console.error(error))
    }

  }, [movie])


  return (
    <>
       {
         movie ? (
          <Container>
          <div className='video_container'>
            <div className="video_header">
              <h2>Videos</h2>
            </div>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              slidesPerView={1}
              navigation={{
                clickable: true, // Optional (make arrows clickable)
                nextEl: '.swiper-button-next', // Optional selector for customization
                prevEl: '.swiper-button-prev', // Optional selector for customization
    
              }}
           
            >
              {
                video && video.map((obj) => {
                  return (
                    <SwiperSlide key={obj.id}>
                      <div className='video_box'>
                        <YouTube videoId={obj.key} opts={opts} onClick={() => handleVideo(movie.id)}></YouTube>
                      </div>
                    </SwiperSlide>
                  )
                })
              }
    
            </Swiper>
          </div>
        </Container>
         ) : null
       }
    </>
  )
}

export default MovieVideoSwiper
