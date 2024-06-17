import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainInterface.css';
import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { useRecoilState } from 'recoil';
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom';

const MainInterface = () => {
  const [activeLink, setActiveLink] = useRecoilState(activeLinkState);
  const navigate = useNavigate();

  return (
    <div className='mainInterface'>
      <Container>
        <div className="first_section py-3 px-2">
          <div className="header d-flex justify-content-between align-items-center py-2 my-2">
            <div className="brand_logo">
              <a href='#' className='text-decoration-none'>
                <span className="text_logo text-capitalize">
                  Zodiac
                </span>
              </a>
            </div>
            <div className="end_part">
              <Link to={'/login'} className='text-decoration-none' onClick={() => setActiveLink('login')}>
                Sign-in
              </Link>
            </div>
          </div>
          <div className="main_container d-flex justify-content-center align-items-center py-5">
            <div className="main_content py-md-5">
              <h1 className='text-capitalize pt-md-5'>Unlimited movies, explore a vast library of reviews.</h1>
              <p className='text-capitalize pt-md-2'>Join the conversation. Read and write reviews that matter.</p>
              <div className="main_button text-center mt-4">
                <button 
                  className='explore_button px-3 py-2' 
                  onClick={() => navigate('/home')}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="section d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4 gap-lg-0 px-4 py-5 mt-2">
        <div className="left_part">
          <div className="main_header">
            <h3>Reviews for everything. Explore a universe of opinions.</h3>
          </div>
        </div>
        <div className="right_part justify-self-center align-self-center">
          <img src="https://cdn.pixabay.com/photo/2017/01/13/18/56/feedback-1977987_1280.jpg" alt="image" className='main_img' />
        </div>
      </div>
      <div className="section d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4 gap-lg-0 px-4 py-5 mt-1">
        <div className="left_part order-lg-1">
          <div className="main_header">
            <h3>You can choose your favorite movie.</h3>
          </div>
        </div>
        <div className="right_part order-lg-0 justify-self-center align-self-center">
          <img src="https://th.bing.com/th/id/OIP.VOJZZaMxRH-xdOhT7Ucu8AAAAA?rs=1&pid=ImgDetMain" alt="image" className='main_img' />
        </div>
      </div>
      <div className="section d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4 px-4 py-5 mt-1">
        <div className="left_part">
          <div className="main_header">
            <h3>Everyone can create an account.</h3>
          </div>
        </div>
        <div className="right_part justify-self-center align-self-center">
          <img src="https://cdn.pixabay.com/photo/2017/09/29/23/44/feedback-2800867_1280.png" alt="image" className='main_img' />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainInterface;
