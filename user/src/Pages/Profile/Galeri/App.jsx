import React from 'react';
import './Homes.css';

function App() {
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

      <div className="content">
        <div className="image-description">
          <img src="/assets/organic-fertilizer.png" alt="Description" className="image" />
          <div className="description">
            <label htmlFor="descriptionInput">Deskripsi:</label>
            <textarea
              id="descriptionInput"
              placeholder="Deskripsi :"
              rows="6"
            />
               <button className="selesai-btn">Selesai</button>
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

export default App;
