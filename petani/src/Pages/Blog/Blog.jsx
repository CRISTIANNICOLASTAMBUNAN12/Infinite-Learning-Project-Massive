import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/blog');  // Update the API endpoint as needed
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Blog Lengkap</h1>
        <p className="text-gray-600 mt-4">
          Jelajahi artikel-artikel terbaru mengenai teknik bertani, tips berkebun, dan informasi penting tentang <br />
          pertanian lokal. Temukan wawasan dan inspirasi untuk mendukung pertanian yang berkelanjutan.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
        {currentPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            <img
              src={post?.gambar ? `http://localhost:4000${post.gambar}` : assets.admin_logo}
              alt={post.nama || 'Produk tidak tersedia'}
              onError={(e) => {
                e.target.src = assets?.placeholder || '/default-placeholder.png';
              }}
              className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-sm text-gray-500">{post.kategori}</span>
              <h3 className="text-lg font-semibold text-gray-800">{post.judul}</h3>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100">
              <div className="flex items-center">
                <i className="fas fa-user-circle text-gray-700 mr-2"></i>
                <p className="text-sm text-gray-600">{post.nama || 'Pengguna Tidak Dikenal'}</p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(post.dibuat_pada).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded-lg text-lg transition-colors ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
