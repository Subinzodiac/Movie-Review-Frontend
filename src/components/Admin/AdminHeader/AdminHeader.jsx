import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../../Header/Header.css'
import '../../DarkMode/DarkMode'
import DarkMode from '../../DarkMode/DarkMode';
import { useRecoilState } from 'recoil';
import { isLoginState,  userDataState } from '../../../Store/Atoms/loginAtom';
import axios from '../../../axios/axios';

const AdminHeader = () => {

   
    const [isLogin, setIsLogin] = useRecoilState(isLoginState)
    const [userData, setUserData] = useRecoilState(userDataState)

    

    //signin fetch
    useEffect(() => {

        const storedIsLogin = localStorage.getItem('isLogin');
        if (storedIsLogin !== null) {
            setIsLogin(JSON.parse(storedIsLogin));
        }
        if (isLogin) {

            const fetchData = async () => {
                try {
                    console.log("This is the login data");
                    const response = await axios.get('/api/v1/admin', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                        }
                    });

                    localStorage.setItem("admin", JSON.stringify(response.data));
                    const adminDataString = localStorage.getItem("admin");

                    if (adminDataString) {
                        const userData = JSON.parse(adminDataString);
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

    const handleLoggOut = () => {
        localStorage.removeItem('isSignup')
        localStorage.removeItem('isLogin')
        localStorage.removeItem('admin')
        localStorage.removeItem('jwt_token')
        setIsLogin(false)
        navigate('/home')
        window.location.reload()
    }
    return (
        <header>
            <Navbar expand="lg" className="py-3" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <span className='logo me-2'>FF</span>
                        FlickFlair
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='text-center text-lg-start navbar_nav mx-auto'>
                            <Link to={"/admin/users"} className='ms-lg-3'>Manage Users</Link>
                            <Link to={"/admin/listOfMovies"} className='ms-lg-3'>Manage Movies</Link>
                        </Nav>
                        <DarkMode />
                        <Nav className='ms-auto text-center text-lg-start'>
                            <Link to={'/login'} onClick={handleLoggOut} className='ms-lg-3'>Logout</Link>
                        </Nav>
                        

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default AdminHeader
