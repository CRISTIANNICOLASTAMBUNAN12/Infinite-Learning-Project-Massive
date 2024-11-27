import React from 'react';
import './Beranda.css';
import { useNavigate } from 'react-router-dom';

function Beranda() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate(`/login`);
  }

  const handleRegister = () => {
    navigate(`/register`);
  }

  return (
    <div className="App">
      {/* Banner */}
      <section className="banner">
        <div className="banner-text">
          <h1>Selamat Datang</h1><br></br>
          <p>Memberikan akses mudah bagi petani untuk berbagi<br></br>
            pengetahuan, berinteraksi, dan memasarkan hasil pertanian.</p><br></br>
          <button className="register-btn" onClick={handleRegister}>Daftar</button>
        </div>
        <img src="/assets/banner.png" alt="Farmer in field" className="banner-image" />
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="blog-title">Blog</div><br></br>
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
        <center><div className="blog-title">Pilihan Kami</div></center><br></br>
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
                  <p className="blog-author"> <i className="fas fa-user-circle profile-icon"></i> {post.author}</p>
                </div>
                <p className="blog-date">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="load-more-btn">Lainnya</button>
      </section>
    </div>
  );
}

export default Beranda;
