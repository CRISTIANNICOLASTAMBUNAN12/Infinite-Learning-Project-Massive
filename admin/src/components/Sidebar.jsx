import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import { MdArticle } from 'react-icons/md';
import { MdMenuBook } from 'react-icons/md';


const Sidebar = () => {
  return (
    <div className="w-60 bg-white text-black border">
      <ul>
        <li className="p-4 hover:bg-green-600">
          <Link to="/dashboard" className="flex items-center">
            <FaHome className="mr-2" /> Dashboard
          </Link>
        </li>
        <li className="p-4 hover:bg-green-600">
          <Link to="/users" className="flex items-center">
            <FaUser className="mr-2" /> Users
          </Link>
        </li>
        <li className="p-4 hover:bg-green-600">
          <Link to="/berita" className="flex items-center">
            <MdArticle className="mr-2" /> Berita
          </Link>
        </li>
        <li className="p-4 hover:bg-green-600">
          <Link to="/edukasi" className="flex items-center">
            <MdMenuBook className="mr-2" /> Edukasi
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
