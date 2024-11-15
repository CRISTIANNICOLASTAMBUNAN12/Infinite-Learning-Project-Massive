import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import { MdArticle, MdMenuBook } from 'react-icons/md';

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Fungsi untuk menutup sidebar setelah item diklik
  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white text-black border-r shadow-lg sm:z-auto z-50 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0`}
    >
      {/* Tombol untuk menutup sidebar */}
      <div className="p-4 flex justify-between items-center sm:hidden">
        <button onClick={toggleSidebar} className="text-2xl">
          ×
        </button>
      </div>

      {/* Daftar menu sidebar */}
      <ul className="space-y-1">
        <li className="px-4 sm:pt-6">
          <Link
            to="/dashboard"
            onClick={handleLinkClick} // Menutup sidebar ketika link diklik
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${isActive('/dashboard') ? 'bg-green-600 text-white' : 'hover:bg-green-100'}`}
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>
        </li>
        <li className="px-4 pt-2">
          <Link
            to="/users"
            onClick={handleLinkClick} // Menutup sidebar ketika link diklik
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${isActive('/users') ? 'bg-green-600 text-white' : 'hover:bg-green-100'}`}
          >
            <FaUser className="mr-3" />
            Users
          </Link>
        </li>
        <li className="px-4 pt-2">
          <Link
            to="/berita"
            onClick={handleLinkClick} // Menutup sidebar ketika link diklik
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${isActive('/berita') ? 'bg-green-600 text-white' : 'hover:bg-green-100'}`}
          >
            <MdArticle className="mr-3" />
            Berita
          </Link>
        </li>
        <li className="px-4 pt-2">
          <Link
            to="/edukasi"
            onClick={handleLinkClick} // Menutup sidebar ketika link diklik
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${isActive('/edukasi') ? 'bg-green-600 text-white' : 'hover:bg-green-100'}`}
          >
            <MdMenuBook className="mr-3" />
            Edukasi
          </Link>
        </li>
      </ul>

      {/* Tombol Logout hanya tampil di tampilan mobile */}
      <div className="flex sm:hidden items-center justify-center p-10">
        <button
          className="w-full bg-green-800 text-white font-semibold text-sm px-10 py-2 rounded-md inline-block"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>


      {/* Tombol Logout disembunyikan pada tampilan desktop */}
      <div className="hidden sm:flex items-center gap-4">
        {/* Tombol logout tidak akan muncul di desktop */}
      </div>
    </div>
  );
};

export default Sidebar;
