import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = ({ setIsAuthenticated, setRole, toggleSidebar, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="h-16 bg-white text-black flex justify-between items-center p-4 border-b sm:px-10">
      {/* Tombol Hamburger di kiri (hanya tampil di tampilan kecil) */}
      <button
        className="sm:hidden text-xl text-gray-600"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Logo di kanan pada tampilan kecil, kiri pada tampilan besar */}
      <div className="flex items-center gap-2 text-xs ml-auto sm:ml-0">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Admin Logo"
          onClick={handleLogoClick}
        />
      </div>

      {/* Tombol Logout hanya tampil pada tampilan besar */}
      <div className="hidden sm:flex items-center gap-4">
        <button
          className="bg-green-600 text-white font-bold text-sm px-7 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          onClick={handleLogout} // Panggil handleLogout dari props
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
