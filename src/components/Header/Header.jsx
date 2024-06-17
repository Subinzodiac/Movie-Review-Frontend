import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from 'react-icons/fa';
import './Header.css';
import { useRecoilState } from 'recoil';
import { isLoginState, userDataState } from '../../Store/Atoms/loginAtom';
import DarkMode from '../DarkMode/DarkMode';
import axios from '../../axios/axios';
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom';

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [userData, setUserData] = useRecoilState(userDataState);
  const [activeLink, setActiveLink] = useRecoilState(activeLinkState);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLogin = localStorage.getItem('isLogin');
    if (storedIsLogin !== null) {
      setIsLogin(JSON.parse(storedIsLogin));
    }
    if (isLogin) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/v1/user/info', {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            }
          });

          localStorage.setItem("user", JSON.stringify(response.data));
          const userDataString = localStorage.getItem("user");

          if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserData(userData);
          } else {
            console.log("No user data found in local storage");
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchData();
    }
  }, [isLogin, setIsLogin, setUserData]);

  const handleNavItemClick = (navItem) => {
    setActiveLink(navItem);
  };

  const handleLoggOut = () => {
    localStorage.removeItem('isSignup');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('user');
    localStorage.removeItem('jwt_token');
    setIsLogin(false);
    navigate('/home');
    window.location.reload();
  };

  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark" className="py-3">
        <Container>
          <Navbar.Brand href="#home">
            <span className='logo'>Z</span> Zodiac
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
              <Link
                to='/home'
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('home')}
              >
                Home
              </Link>
              <Link
                to='/movies'
                className={`nav-link ${activeLink === 'movie' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('movie')}
              >
                Movies
              </Link>
              {!isLogin && (
                <Link
                  to='/login'
                  className={`nav-link ${activeLink === 'login' ? 'active' : ''}`}
                  onClick={() => handleNavItemClick('login')}
                >
                  Login
                </Link>
              )}
            </Nav>
            {isLogin ? (
              <Nav className='ms-auto'>
                <DarkMode className='dark-mode-toggle' />
                <NavDropdown
                  title={
                    <>
                      <span className='user_icon'><FaUser /></span>
                      {userData && userData.username}
                    </>
                  }
                  id="basic-nav-dropdown"
                  className='navbar_dropdown'
                >
                  <NavDropdown.Item as={Link} to='/user/favorites' onClick={() => handleNavItemClick('favorites')}>
                    Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/user/reviews' onClick={() => handleNavItemClick('reviews')}>
                    Reviews
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/user/update-password' onClick={() => handleNavItemClick('updatePassword')}>
                    Update Password
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/home' onClick={() => { handleNavItemClick('logOut'); handleLoggOut(); }}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className='ms-auto'>
                <DarkMode className='dark-mode-toggle' />
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
