import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, handleLogout, isAuthenticated, role }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch('/api/profil', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data.data);
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            }
        };

        if (isAuthenticated) {
            fetchProfileData();
        }
    }, [isAuthenticated]);

    const handleLogoutClick = () => {
        handleLogout();
        setIsDropdownOpen(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [isAuthenticated]);

    return (
        <div className="h-16 bg-white text-black flex justify-between items-center px-4 border-b sm:px-10">
            <div className="flex items-center gap-4">
                <img
                    className="w-36 sm:w-40 cursor-pointer"
                    src={assets.admin_logo}
                    alt="Logo"
                    onClick={() => navigate('/')}
                />
            </div>

            <div className="hidden md:flex gap-8">
                {!isAuthenticated && (
                    <button className="text-sm font-medium" onClick={() => navigate('/')}>
                        Beranda
                    </button>
                )}
                {isAuthenticated && (
                    <button
                        className="text-sm font-medium hover:text-green-900 transition"
                        onClick={() => handleNavigation('/pasar')}
                    >
                        Pasar
                    </button>
                )}
                <button
                    className="text-sm font-medium hover:text-green-900 transition"
                    onClick={() => handleNavigation('/blog')}
                >
                    Blog
                </button>
                <button
                    className="text-sm font-medium hover:text-green-900 transition bold"
                    onClick={() => handleNavigation('/berita')}
                >
                    Berita & Acara
                </button>
            </div>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    role === 'petani' && (
                        <div className="flex items-center gap-4">
                            <div className="relative" ref={profileRef}>
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <img
                                        className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                                        src={`http://localhost:4000${profile?.gambar || assets.upload_area}`}
                                        onError={(e) => {
                                            e.target.src = assets.upload_area;
                                        }}
                                        alt="Profile"
                                    />
                                    <span className="hidden sm:inline-block text-sm font-medium text-black">
                                        {profile?.nama?.split(' ').slice(0, 2).join(' ') || 'User'}
                                    </span>
                                </div>

                                {isDropdownOpen && (
                                    <DropdownMenu
                                        ref={dropdownRef}
                                        handleNavigation={handleNavigation}
                                        handleLogout={handleLogoutClick}
                                    />
                                )}
                            </div>

                            <button
                                className="text-2xl text-gray-600 md:hidden"
                                onClick={toggleSidebar}
                            >
                                ☰
                            </button>
                        </div>
                    )
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => navigate('/login')}
                    >
                        Masuk
                    </button>
                )}
            </div>
        </div>
    );
};

const DropdownMenu = React.forwardRef(({ handleNavigation, handleLogout }, ref) => (
    <div
        ref={ref}
        className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-md w-48 z-10"
    >
        <ul className="py-1 text-sm text-gray-700">
            <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavigation('/profil')}
            >
                <FaUser className="text-blue-500" />
                Profil
            </li>
            <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavigation('/pengaturan')}
            >
                <FaCog className="text-green-500" />
                Pengaturan
            </li>
            <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
            >
                <FaSignOutAlt className="text-red-500" />
                Logout
            </li>
        </ul>
    </div>
));

export default Navbar;
