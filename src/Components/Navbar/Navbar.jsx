import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import goodwishLogo from '../../assets/wishchat-logo.png';

export default function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

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

    return (
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
                        onClick={() => { navigate('/dashboard'); handleMenuClick(); }}
                    >
                        Chatbot
                    </li>
                    <li 
                        className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => { navigate('/playground'); handleMenuClick(); }}
                    >
                        Playground
                    </li>
                    <li 
                        className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => { navigate('/deploy'); handleMenuClick(); }}
                    >
                        Deploy
                    </li>
                    <li 
                        className="text-2xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => { navigate('/upload'); handleMenuClick(); }}
                    >
                        Build
                    </li>
                </ul>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:flex-row md:space-x-[50px] md:items-center md:justify-end" style={{ fontFamily: 'cursive' }}>
                <ul className="flex flex-row items-center space-x-[50px]">
                    <li 
                        className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate('/home')}
                    >
                        Home
                    </li>
                    <li 
                        className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate('/dashboard')}
                    >
                        Chatbot
                    </li>
                    <li 
                        className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate('/playground')}
                    >
                        Playground
                    </li>
                    <li 
                        className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate('/deploy')}
                    >
                        Deploy
                    </li>
                    <li 
                        className="text-3xl font-semibold text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate('/upload')}
                    >
                        Build
                    </li>
                </ul>
            </div>
        </nav>
    );
}
