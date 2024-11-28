import React from 'react';
import { Link } from 'react-router-dom';

function Galeri() {
  return (
    <div className="App">

      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="logo">
          <img src="/assets/logos.png" alt="Logo" className="w-20 h-auto" />
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/beranda" className="font-semibold text-gray-700 hover:text-green-500">Beranda</Link></li>
            <li><Link to="/forum-komunitas" className="font-semibold text-gray-700 hover:text-green-500">Forum & Komunitas</Link></li>
            <li><Link to="/blog" className="font-semibold text-gray-700 hover:text-green-500">Blog</Link></li>
            <li><Link to="/berita" className="font-semibold text-gray-700 hover:text-green-500">Berita & Acara</Link></li>
            <li><Link to="/pasar" className="font-semibold text-gray-700 hover:text-green-500">Pasar</Link></li>
          </ul>
        </nav>
        <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Masuk</button>
      </header>

      {/* Content */}
      <div className="content p-32">
        <div className="flex items-start space-x-8">
          {/* Image Section */}
          <div>
            <img src="/assets/organic-fertilizer.png" alt="Description" className="w-96 h-auto" />
          </div>

          {/* Description Section */}
          <div className="flex flex-col space-y-4">
            <label htmlFor="descriptionInput" className="text-2xl font-bold text-brown-600">Deskripsi:</label>
            <textarea
              id="descriptionInput"
              placeholder="Deskripsi :"
              rows="6"
              className="px-4 py-2 w-[1000px] h-[380px] border border-gray-300 rounded-md resize-none text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="self-end px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-4">Selesai</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-screen-xl mx-auto flex justify-between px-6">
          <div className="footer-left space-y-4">
            <div className="flex items-center space-x-4">
              <img src="/assets/logos.png" alt="Logo" className="w-16 h-auto" />
              <div className="text-gray-600">
                <p>Bersama kita wujudkan masa depan pertanian yang berkelanjutan<br />
                  dengan inovasi dan teknologi terkini, mendukung petani dan<br />
                  memperkuat sektor pertanian Indonesia.
                </p>
              </div>
            </div>
          </div>
          <div className="footer-right space-y-4">
            <div className="quick-links">
              <h4 className="font-semibold text-gray-700">Akses Cepat</h4>
              <ul className="space-y-2">
                <li>Beranda</li>
                <li>Acara</li>
                <li>Blog</li>
                <li>Pasar</li>
                <li>Komunitas</li>
                <li>Forum</li>
              </ul>
            </div>
            <div className="social-media">
              <h4 className="font-semibold text-gray-700">Social Media</h4>
              <ul className="space-y-2">
                <li>Discord</li>
                <li>Instagram</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8">Copyright © 2024 All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Galeri;
