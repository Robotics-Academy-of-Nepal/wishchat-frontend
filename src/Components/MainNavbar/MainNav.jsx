import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import goodwishLogo from '../../assets/wishchat-logo.png';
import axios from 'axios';

function Home() {

    const pic = localStorage.getItem("Picture");
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        const pic = localStorage.getItem('Picture');
        if (token) {
            setIsAuthenticated(true);
            setUserPicture(pic);
        }

        // Animation timer
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 7500);

        return () => clearTimeout(timer);
    }, []);

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/signin');
        }
    };

    const handleMenuClick = () => {
        setIsMenuOpen(false); // Close the menu after a link is clicked
    };

    // Close menu if click is outside the menu area
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Picture');
        setIsAuthenticated(false);
        navigate('/');
    };

    // Close menu or dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <nav className="sticky top-0 z-50 px-6 py-2 bg-white shadow-md md:px-12">
                <ul className="flex items-center justify-between" style={{ fontFamily: 'cursive' }}>
                    {/* Logo */}
                    <li onClick={() => navigate('/home')} className="cursor-pointer">
                        <img className="w-32 md:w-24" src={goodwishLogo} alt="Goodwish Logo" />
                    </li>

                    {/* Hamburger Icon for Mobile */}
                    <li className="md:hidden">
                        <button
                            className="text-3xl cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            &#9776; {/* The 3-line icon */}
                        </button>
                    </li>
                </ul>

                {/* Overlay for Mobile Menu */}
                {isMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}

                {/* Mobile Menu (on toggle) */}
                <div 
                    ref={menuRef}
                    className={`${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-10`}>
                    <ul className="flex flex-col items-center py-4 space-y-4">
                    <li 
                            className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                            onClick={() => { navigate('/home'); handleMenuClick(); }}
                        >
                            Home
                        </li>
                        <li 
                            className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                            onClick={() => { navigate('/tutorials'); handleMenuClick(); }}
                        >
                            Tutorials
                        </li>
                        <li 
                            className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                            onClick={() => { navigate('/features'); handleMenuClick(); }}
                        >
                            Features
                        </li>
                        <li 
                            className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                            onClick={() => { navigate('/pricing'); handleMenuClick(); }}
                        >
                            Pricing
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li 
                                    className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                                    onClick={() => { navigate('/dashboard'); handleMenuClick(); }}
                                >
                                    Chatbot
                                </li>
                                <li 
                                    className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                                    onClick={() => { navigate('/profile'); handleMenuClick(); }}
                                >
                                    <img
                        className="rounded-full w-[50px] h-[50px] shadow-lg border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        src={pic || "https://via.placeholder.com/180"}
                        alt="Profile Picture"
                    /> 
                                </li>
                            </>
                        ) : (
                            <li 
                                className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                                onClick={() => { navigate('/signin'); handleMenuClick(); }}
                            >
                                Signin
                            </li>
                        )}
                    </ul>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:flex-row md:space-x-[50px] md:items-center md:justify-end"
                 style={{ fontFamily: 'cursive' }}>
                    <ul className="flex flex-row items-center space-x-[50px]">
                        <li 
                            className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                            onClick={() => navigate('/tutorials')}
                        >
                            Tutorials
                        </li>
                        <li 
                            className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                            onClick={() => navigate('/features')}
                        >
                            Features
                        </li>
                        <li 
                            className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                            onClick={() => navigate('/pricing')}
                        >
                            Pricing
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li 
                                    className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                                    onClick={() => { navigate('/dashboard'); handleMenuClick(); }}
                                >
                                    Chatbot
                                </li>
                               <li className="relative">
                                <img
                                    className="rounded-full w-[50px] h-[50px] cursor-pointer shadow-lg border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                    src={pic || "https://via.placeholder.com/180"}
                                    alt="Profile Picture"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                />
                                {isDropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute right-0 w-40 mt-2 bg-white rounded-lg shadow-md"
                                    >
                                        <button
                                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                            onClick={() => navigate('/profile')}
                                        >
                                            Profile
                                        </button>
                                        <button
                                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </li>
                            </>
                        ) : (
                            <li 
                                className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                                onClick={() => navigate('/signin')}
                            >
                                Signin
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Home;
