import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { MdArticle, MdMenuBook } from "react-icons/md";

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
      className={`fixed top-0 right-0 w-64 h-full bg-white text-black border-l shadow-lg z-50 transition-all duration-300 sm:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Tombol untuk menutup sidebar */}
      <div className="p-4 flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-2xl">
          ×
        </button>
      </div>

      {/* Daftar menu sidebar */}
      <ul className="space-y-1">
        <li className="px-4 pt-2">
          <Link
            to="/pasar"
            onClick={handleLinkClick}
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${
              isActive("/pasar")
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
            }`}
          >
            <FaHome className="mr-3" />
            Pasar
          </Link>
        </li>
        <li className="px-4 pt-2">
          <Link
            to="/blog"
            onClick={handleLinkClick}
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${
              isActive("/blog")
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
            }`}
          >
            <FaUser className="mr-3" />
            Blog
          </Link>
        </li>
        <li className="px-4 pt-2">
          <Link
            to="/berita"
            onClick={handleLinkClick}
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${
              isActive("/berita")
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
            }`}
          >
            <MdArticle className="mr-3" />
            Berita
          </Link>
        </li>
        <li className="px-4 pt-2">
          <Link
            to="/edukasi"
            onClick={handleLinkClick}
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${
              isActive("/edukasi")
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
            }`}
          >
            <MdMenuBook className="mr-3" />
            Edukasi
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
