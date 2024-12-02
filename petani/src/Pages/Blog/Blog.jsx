import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Fetching all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setPosts(data); // Save all posts in state
        setFilteredPosts(data); // Initialize filtered posts
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle search filter locally
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPosts(posts); // If search term is empty, show all posts
    } else {
      const filtered = posts.filter((post) =>
        post.judul.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered); // Update filtered posts
    }
  }, [searchTerm, posts]); // Re-run when searchTerm or posts change

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Cari Blog..."
          className="p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
        {currentPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            <img
              src={post?.gambar ? `http://localhost:4000${post.gambar}` : '/default-placeholder.png'}
              alt={post.judul || 'Produk tidak tersedia'}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = '/default-placeholder.png';  // Handle image loading errors
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{post.judul}</h3>
              <p className="text-sm text-gray-800">
                {post.konten && post.konten.split(' ').length > 10
                  ? `${post.konten.split(' ').slice(0, 10).join(' ')}...`
                  : post.konten}
              </p>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100">
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{post.kategori}</span>
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
};

export default Blog;
