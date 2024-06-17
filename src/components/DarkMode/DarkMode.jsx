import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { LuSunMoon } from 'react-icons/lu';
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom';
import { Nav } from 'react-bootstrap';


const DarkMode = () => {
    const [activeLink, setActiveLink] = useRecoilState(activeLinkState);
    const [text, setText] = useState('');
    
    // Apply theme based on local storage on component mount
    useEffect(() => {
        const selectedTheme = localStorage.getItem("selectedTheme");
        if(selectedTheme === "dark") {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, []);

    const handleNavItemClick = (navItem) => {
        setActiveLink(navItem);
    };

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark");
        setText("Light Mode");
    };

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light");
        setText("Dark Mode");
    };

    const toggleTheme = () => {
        const isDarkMode = document.body.dataset.theme === 'dark';
        if (isDarkMode) {
            setLightMode();
        } else {
            setDarkMode();
        }
    };

    return (
        <Nav
            className={`me-lg-3 mt-2 mt-lg-0 px-1 py-1 ${activeLink === 'theme' ? 'active' : ''}`}
            style={{color: 'white'}}
            onClick={() => {
                handleNavItemClick('theme');
                toggleTheme();
            }}
        >
           <span className='d-flex justify-content-center align-items-center'>
           <LuSunMoon />
            <span id='mode_text' className='ms-2'>{text && text}</span>
           </span>
        </Nav>
    );
};

export default DarkMode;
