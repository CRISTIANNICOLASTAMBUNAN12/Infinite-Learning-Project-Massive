import React, { useState, useEffect } from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';

function Blog() {
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
    </div>
  );
}

export default Blog;
