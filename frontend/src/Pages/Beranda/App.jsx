import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
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

      {/* Banner */}
      <section className="banner">
        <div className="banner-text">
          <h1>Selamat Datang</h1><br></br>
          <p>Memberikan akses mudah bagi petani untuk berbagi<br></br>
            pengetahuan, berinteraksi, dan memasarkan hasil pertanian.</p><br></br>
          <button className="register-btn">Daftar</button>
        </div>
        <img src="/assets/banner.png" alt="Farmer in field" className="banner-image" />
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div class="blog-title">Blog</div><br></br>
        <p>Jelajahi artikel-artikel terbaru mengenai teknik bertani, tips berkebun, dan informasi penting tentang <br></br> pertanian lokal. Temukan wawasan dan inspirasi untuk mendukung pertanian yang berkelanjutan.</p><br></br><br></br>
        <div className="blog-categories">
          {["Bertani Modern", "Produk Lokal", "Inovasi Pertanian", "Penyakit Tanaman", "Cerita Petani", "Berkebun Rumah"].map((category, index) => (
            <div key={index} className="category">
              <img src={`/assets/${category.toLowerCase().replace(" ", "-")}.png`} alt={category} />
              <p>{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selection Section */}
      <section className="selection-section">
        <center><div class="blog-title">Pilihan Kami</div></center><br></br>
        <p>Di bawah ini, Anda bisa membaca blog terbaru mengenai perkembangan dan inovasi di bidang pertanian.</p>
        <div className="selection-grid">
          {[
            { title: "Manfaat Drone dalam Pemantauan Pertanian", date: "28/10/2024", author: "John Doe", image: "drone.png" },
            { title: "Panduan Budi Daya Sayuran Hidroponik", date: "28/10/2024", author: "Jane Smith", image: "carrot.png" },
            { title: "Meningkatkan Kesehatan dengan Pertanian Terpadu", date: "28/10/2024", author: "Mark Lee", image: "healthy-farming.png" },
            { title: "Penggunaan Pupuk Organik untuk Hasil Maksimal", date: "28/10/2024", author: "Sarah Johnson", image: "organic-fertilizer.png" },
            { title: "Menggunakan Pupuk Organik untuk Hasil Optimal", date: "28/10/2024", author: "Alice Brown", image: "pest-control.png" },
            { title: "Teknologi Terbaru di Industri Pertanian", date: "28/10/2024", author: "Paul Green", image: "technology.png" }
          ].map((post, index) => (
            <div key={index} className="blog-card">
              <img src={`/assets/${post.image}`} alt={post.title} />
              <div className="blog-info">
                <span>KATEGORI BLOG</span>
                <h3>{post.title}</h3>
              </div>
              <div className="blog-footer">
                <div className="author-info">
                  {/* Profile icon */}
                  <p className="blog-author"> <i className="fas fa-user-circle profile-icon"></i> {post.author}</p>
                </div>
                <p className="blog-date">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="load-more-btn">Lainnya</button>
      </section>

      {/* Footer */}
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
    </div>
  );
}

export default App;
