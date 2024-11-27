import React from "react";
import './Footer.css';

const Footer = ({ isOpen, toggleSidebar, handleLogout }) => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-left">
        <div className="logo-container">
          <img src="/assets/logos.png" alt="Logo" className="footer-logo" />
          <div className="about">
            <p>Bersama kita wujudkan masa depan pertanian yang berkelanjutan <br>
            </br>dengan inovasi dan teknologi terkini, mendukung petani dan <br>
              </br>memperkuat sektor pertanian Indonesia.</p>
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
);

export default Footer;
