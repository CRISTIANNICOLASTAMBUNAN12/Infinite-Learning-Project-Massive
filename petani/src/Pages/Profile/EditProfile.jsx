import React from 'react';
import './EditProfile.css';
import { Link } from 'react-router-dom';

function EditProfile() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src="/assets/logos.png" alt="Logo" className="logo-image" />
        </div>
        <nav>
          <ul>
            <li><Link to="/beranda" className="bold-link">Beranda</Link></li>
            <li><Link to="/forum-komunitas" className="bold-link">Forum & Komunitas</Link></li>
            <li><Link to="/blog" className="bold-link">Blog</Link></li>
            <li><Link to="/berita" className="bold-link">Berita & Acara</Link></li>
            <li><Link to="/pasar" className="bold-link">Pasar</Link></li>
          </ul>
        </nav>
        <button className="login-btn">Masuk</button>
      </header>

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-content">
            <div className="profile-info">
              <img
                src="/assets/contt.png"
                alt="Profile"
                className="profile-image"
              />
            </div>

            <form className="profile-form">
              <h3>Informasi Lengkap</h3>
              <div className="input-container">
                <input
                  id="full-name"
                  type="text"
                  placeholder="Nama Lengkap"
                />
              </div>
              <div className="input-container">
                <input
                  id="address"
                  type="text"
                  placeholder="Alamat/Lokasi"
                />
              </div>
              <div className="input-container">
                <input
                  id="phone"
                  type="text"
                  placeholder="No. HP"
                />
              </div>

              <h3>Hasil Panen</h3>
              <div className="input-container">
                <input
                  id="harvest-category"
                  type="text"
                  placeholder="Kategori Hasil Panen"
                />
              </div>
              <div className="input-container">
                <input
                  id="harvest-type"
                  type="text"
                  placeholder="Jenis Hasil Panen"
                />
              </div>
              <div className="input-container">
                <textarea
                  id="description"
                  placeholder="Deskripsi"
                />
              </div>

              <div className="edit-btn-container">
                <button type="button">Selesai Edit</button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="logo-container">
              <img src="/assets/logos.png" alt="Logo" className="footer-logo" />
              <div className="about">
                <p>
                  Bersama kita wujudkan masa depan pertanian yang berkelanjutan
                  <br />
                  dengan inovasi dan teknologi terkini, mendukung petani dan
                  <br />
                  memperkuat sektor pertanian Indonesia.
                </p>
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

export default EditProfile;
