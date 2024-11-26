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
          <h1>Selamat Datang</h1>
          <p>Memberikan akses mudah bagi petani untuk berbagi<br></br>
            pengetahuan, berinteraksi, dan memasarkan hasil pertanian.</p><br></br>
          <button className="register-btn">Daftar</button>
        </div>
        <img src="/assets/banner.png" alt="Farmer in field" className="banner-image" />
      </section>


      {/* Blog Section */}
      <section className="blog-section">
        <h2>Blog</h2>
        <p>Jelajahi artikel-artikel terbaru mengenai teknik bertani, tips berkebun, dan informasi penting tentang <br></br> pertanian lokal. Temukan wawasan dan inspirasi untuk mendukung pertanian yang berkelanjutan.</p>
        <div className="blog-categories">
          {["Bertani Modern", "Produk Lokal", "Inovasi Pertanian", "Penyakit Tanaman", "Cerita Petani"].map((category, index) => (
            <div key={index} className="category">
              <img src={`${category.toLowerCase().replace(" ", "-")}.jpg`} alt={category} />
              <p>{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selection Section */}
      <section className="selection-section">
        <h2>Pilihan Kami</h2>
        <p>Di bawah ini, Anda bisa membaca blog terbaru mengenai perkembangan...</p>
        <div className="selection-grid">
          {[
            { title: "Manfaat Drone dalam Pemantauan Pertanian", date: "28/10/2024", image: "drone.jpg" },
            { title: "Pentingnya Sayuran Organik", date: "28/10/2024", image: "carrot.jpg" },
            { title: "Meningkatkan Kesehatan dengan Pertanian Terpadu", date: "28/10/2024", image: "healthy-farming.jpg" },
            { title: "Penggunaan Pupuk Organik untuk Hasil Maksimal", date: "28/10/2024", image: "organic-fertilizer.jpg" },
            { title: "Cara Atasi Hama dengan Cara Alami", date: "28/10/2024", image: "pest-control.jpg" },
            { title: "Teknologi Terbaru di Industri Pertanian", date: "28/10/2024", image: "technology.jpg" }
          ].map((post, index) => (
            <div key={index} className="blog-card">
              <img src={post.image} alt={post.title} />
              <div className="blog-info">
                <span>KATEGORI BLOG</span>
                <h3>{post.title}</h3>
                <p>{post.date}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="load-more-btn">Lainnya</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="about">
            <h4>PETANI PINTAR</h4>
            <p>Deskripsi singkat tentang tujuan dan visi PETANI PINTAR...</p>
          </div>
          <div className="quick-links">
            <h4>Akses Cepat</h4>
            <ul>
              <li>Beranda</li>
              <li>Acara</li>
              <li>Pasar</li>
              <li>Komunitas</li>
              <li>Forum</li>
            </ul>
          </div>
          <div className="social-media">
            <h4>Social Media</h4>
            <p>Links to social media</p>
          </div>
        </div>
        <p className="copyright">Copyright © 2024 All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
