import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const posts = [
    { title: "Manfaat Drone dalam Pemantauan Pertanian", date: "28/10/2024", author: "John Doe", image: "drone.png" },
    { title: "Panduan Budi Daya Sayuran Hidroponik", date: "28/10/2024", author: "Jane Smith", image: "carrot.png" },
    { title: "Meningkatkan Kesehatan dengan Pertanian Terpadu", date: "28/10/2024", author: "Mark Lee", image: "healthy-farming.png" },
    { title: "Penggunaan Pupuk Organik untuk Hasil Maksimal", date: "28/10/2024", author: "Sarah Johnson", image: "organic-fertilizer.png" },
    { title: "Menggunakan Pupuk Organik untuk Hasil Optimal", date: "28/10/2024", author: "Alice Brown", image: "pest-control.png" },
    { title: "Teknologi Terbaru di Industri Pertanian", date: "28/10/2024", author: "Paul Green", image: "technology.png" },
    { title: "Manfaat Drone dalam Pemantauan Pertanian", date: "28/10/2024", author: "John Doe", image: "drone.png" },
    { title: "Panduan Budi Daya Sayuran Hidroponik", date: "28/10/2024", author: "Jane Smith", image: "carrot.png" },
    { title: "Meningkatkan Kesehatan dengan Pertanian Terpadu", date: "28/10/2024", author: "Mark Lee", image: "healthy-farming.png" },

  ];

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  // Log the current items for debugging
  useEffect(() => {
    console.log("Current page:", currentPage);
    console.log("Index of First Item:", indexOfFirstItem);
    console.log("Index of Last Item:", indexOfLastItem);
    console.log("Displayed posts:", currentPosts);
  }, [currentPage, currentPosts]);
  

  // Change page
  const paginate = (pageNumber) => {
    console.log("Page clicked:", pageNumber);
    setCurrentPage(pageNumber);
  };

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

      <section className="selection-section">
        <center><div className="blog-title">Blog Lengkap</div></center><br />
        <p style={{ color: 'black' }}>
  Jelajahi artikel-artikel terbaru mengenai teknik bertani, tips berkebun, dan informasi penting tentang <br />
  pertanian lokal. Temukan wawasan dan inspirasi untuk mendukung pertanian yang berkelanjutan.
</p>
        <div className="selection-grid">
          {currentPosts.map((post, index) => (
            <div key={index} className="blog-card">
              <img src={`/assets/${post.image}`} alt={post.title} />
              <div className="blog-info">
                <span>KATEGORI BLOG</span>
                <h3>{post.title}</h3>
              </div>
              <div className="blog-footer">
                <div className="author-info">
                  <p className="blog-author"><i className="fas fa-user-circle profile-icon" style={{ color: 'white' }}></i>
                  {post.author}</p>
                </div>
                <p className="blog-date">{post.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

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
