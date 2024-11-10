import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = ({ setIsAuthenticated, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(''); // Menghapus role
    navigate('/'); // Redirect ke halaman login
  };

  return (
    <div className="h-16 bg-white text-white flex justify-between items-center sm:px-10 p-4">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} alt="" />
      </div>
      <button
        className="bg-green-600 text-black text-sm px-10 py-2 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
