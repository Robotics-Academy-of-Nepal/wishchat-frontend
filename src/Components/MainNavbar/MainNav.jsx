import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import goodwishLogo from '../../assets/wishchat-logo.png';

function Home() {
    const pic = localStorage.getItem("Picture");
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const pic = localStorage.getItem('Picture');
        if (token) {
            setIsAuthenticated(true);
        }

        return () => clearTimeout();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Picture');
        setIsAuthenticated(false);
        navigate('/');
    };

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
            <nav className="sticky top-0 z-50 px-6 py-4 bg-white ">
                <div className="flex items-center justify-between md:px-12">
                    {/* Logo */}
                    <div onClick={() => navigate('/home')} className="flex-shrink-0 cursor-pointer">
                        <img className="w-32 md:w-24" src={goodwishLogo} alt="Goodwish Logo" />
                    </div>

                    {/* Desktop Menu */}
                    <ul className="items-center hidden space-x-10 md:flex"  style={{ fontFamily: "Georgia" }}>
                        <li className="text-3xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')}>Home</li>
                        <li className="text-3xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/tutorials')}>Tutorials</li>
                        <li className="text-3xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/features')}>Features</li>
                        <li className="text-3xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/pricing')}>Pricing</li>
                        {isAuthenticated ? (
                            <>
                                <li className="text-3xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/dashboard')}>Chatbot</li>
                                <li className="relative">
                                    <img
                                        className="rounded-full w-[50px] h-[50px] cursor-pointer shadow-lg border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                        src={pic || "https://via.placeholder.com/180"}
                                        alt="Profile"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    />
                                    {isDropdownOpen && (
                                        <div ref={dropdownRef} className="absolute right-0 w-40 mt-2 bg-white rounded-lg shadow-md">
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
                            <li className="text-3xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/signin')}>Signin</li>
                        )}
                    </ul>

                    {/* Mobile Hamburger Icon */}
                    <button
                        className="text-3xl cursor-pointer md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        &#9776;
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div ref={menuRef} className="fixed top-0 right-0 z-10 w-2/3 h-full bg-white shadow-lg md:hidden">
                        <ul className="flex flex-col items-center py-4 space-y-4">
                            <li className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/home')}>Home</li>
                            <li className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/tutorials')}>Tutorials</li>
                            <li className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/features')}>Features</li>
                            <li className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/pricing')}>Pricing</li>
                            {isAuthenticated ? (
                                <>
                                    <li className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/dashboard')}>Chatbot</li>
                                    <li>
                                        <img
                                            className="rounded-full w-[50px] h-[50px] shadow-lg border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                            src={pic || "https://via.placeholder.com/180"}
                                            alt="Profile"
                                        />
                                    </li>
                                </>
                            ) : (
                                <li className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" onClick={() => navigate('/signin')}>Signin</li>
                            )}
                        </ul>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Home;
