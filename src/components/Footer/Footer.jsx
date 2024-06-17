import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Footer.css'
import { Link } from 'react-router-dom';
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom';
import { useRecoilState } from 'recoil';


const Footer = () => {
    const [activeLink, setActiveLink] = useRecoilState(activeLinkState)
    return (
        <footer className="footer py-5 py-lg-3 px-1 ">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="footer_section py-3 py-md-3">
                            <h3 className='text-capitalize py-3'>About ZODIAC</h3>
                            <p>
                            Zodiac: Your ultimate movie hub. Discover, rate, and discuss films. Join our community for the latest reviews and personalized recommendations.
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="footer_section pt-2 pb-1 py-md-3">
                            <h3 className='text-bold-capitalize py-3'>Easy Access</h3>
                            <ul>
                                <li className='list-unstyled mb-1' onClick={() => {
                                    setActiveLink("home") 
                                    window.scrollTo(0, 0)}}
                                >
                                    <Link to={"/home"}>Home</Link>
                                </li>
                                <li 
                                  className='list-unstyled mb-1' 
                                  onClick={() => {
                                    setActiveLink("movie")
                                    window.scrollTo(0, 0)
                                   }}
                                >
                                    <Link to={"/movies"}>Movies</Link>
                                </li>
                                <li 
                                  className='list-unstyled mb-1' 
                                  onClick={() => {
                                    setActiveLink("reviews")
                                    window.scrollTo(0, 0)}}
                                >
                                    <Link to={"/user/reviews"}>Reviews</Link>
                                </li>
                                <li 
                                  className='list-unstyled mb-1' 
                                  onClick={() =>{
                                    setActiveLink("favorites")
                                     window.scrollTo(0, 0)}}
                                >
                                    <Link to={"/user/favorites"}>Favorites</Link>
                                </li>
                              
                            </ul>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="footer_section pt-2 pb-1 py-md-3">
                            <h3 className='text-capitalize py-3'>Contact Us</h3>
                            <p>Email: supportzoidac@gamil.com</p>
                            <p>Phone: 0495-2455879</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer_bottom">
                <Container>
                    <Row>
                        <Col md={12}>
                            <p className="text-center mt-2">
                                &copy; 2024 ZODIAC. All Rights Reserved.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer