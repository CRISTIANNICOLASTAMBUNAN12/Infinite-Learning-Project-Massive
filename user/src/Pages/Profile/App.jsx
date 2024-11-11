import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const crops = [
    '/assets/banner.png',
    '/assets/banner.png',
    '/assets/banner.png',
    '/assets/banner.png',
    '/assets/banner.png',
    '/assets/banner.png',
  ];
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src="/assets/logos.png" alt="Logo" className="logo-image" />
        </div>
        <nav>
          <ul>
            <li>Beranda</li>
            <li>Forum & Komunitas</li>
            <li>Blog</li>
            <li>Berita & Acara</li>
            <li>Pasar</li>
          </ul>
        </nav>
        <button className="login-btn">Masuk</button>
      </header>

      <div className="profile-page">
  {/* Profile Section */}
  <div className="profile-card">
    <div className="profile-info">
      <img 
        src="/assets/contt.png" 
        alt="Profile" 
        className="profile-image"
      />
      <div className="profile-details">
        <div className="profile-header">
          <h2 className="profile-name">Kim Taehyung</h2>
          <button className="edit-button">Edit Profil</button>
        </div><br></br><br></br>
        <p className="location">Location: Korea Utara</p><br></br>
        <p className="phone">Phone: +123456789</p><br></br>
        <p className="description">Description: Tanaman Pangan - Jagung, Cabai, Sayur, Padi</p>
      </div>
    </div>
  </div>

  {/* Crop Gallery Section */}
  <div className="crop-gallery">
    <h3 className="gallery-title">HASIL PANEN</h3><br></br>
    <div className="crop-grid">
      {crops.map((crop, index) => (
        <div key={index} className="crop-item">
          <img src={crop} alt="Crop" className="crop-image" />
        </div>
      ))}
    </div>
    <button className="add-button">+</button>
  </div>
</div>




      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="logo-container">
              <img src="/assets/logos.png" alt="Logo" className="footer-logo" />
              <div className="about">
                <p>Bersama kita wujudkan masa depan pertanian yang berkelanjutan <br />dengan inovasi dan teknologi terkini, mendukung petani dan <br />memperkuat sektor pertanian Indonesia.</p>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <div className="quick-links">
              <h4>Akses Cepat</h4>
              <ul>
                <li>Beranda</li>
                <li>Acara</li>
                <li>Blog</li>
                <li>Pasar</li>
                <li>Komunitas</li>
                <li>Forum</li>
              </ul>
            </div>
            <div className="social-media">
              <h4>Social Media</h4>
              <ul>
                <li>Discord</li>
                <li>Instagram</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="copyright">Copyright © 2024 All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
