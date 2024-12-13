import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaPlus, FaThumbsUp, FaComment } from "react-icons/fa";
import KomentarModal from "../../Modal/KomentarModal";

function Pasar() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [sarans, setSarans] = useState([]);
  const [profil, setProfil] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [commentsCount, setCommentsCount] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = "http://localhost:4000";
  const API_ENDPOINTS = {
    produk: `${API_BASE_URL}/api/produk`,
    saran: `${API_BASE_URL}/api/pengguna/petani/saran`,
    profil: `${API_BASE_URL}/api/profil`,
    suka: `${API_BASE_URL}/api/suka`,
    komentar: (id) => `${API_BASE_URL}/api/produk-komentar/${id}/count`,
    count: (id) => `${API_BASE_URL}/api/suka/count/${id}`,
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan");
    }

    const finalOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, finalOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Gagal mengambil data (HTTP ${response.status})`);
    }
    return await response.json();
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate('/login');
          return;
        }

        const profilResponse = await fetchWithAuth(API_ENDPOINTS.profil);
        setProfil(profilResponse.data);

        const [postsData, saransData] = await Promise.all([
          fetchWithAuth(API_ENDPOINTS.produk),
          fetchWithAuth(API_ENDPOINTS.saran),
        ]);

        setPosts(postsData);
        setSarans(saransData);

        await fetchLikeData(postsData);
        await fetchCommentsCounts(postsData); // Pastikan ini dipanggil setelah postsData di-set
      } catch (error) {
        console.error("Error fetching initial data:", error);
        alert(`Terjadi kesalahan: ${error.message}. Silakan refresh halaman atau login kembali.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [navigate]);

  useEffect(() => {
    if (posts.length > 0) {
      fetchCommentsCounts(posts);
      fetchLikeData(posts);
    }
  }, [posts, profil]);

  const fetchCommentsCounts = async (postsData) => {
    const counts = {};
    await Promise.all(
      postsData.map(async (post) => {
        try {
          const response = await fetch(API_ENDPOINTS.komentar(post.id), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch comments count for post ${post.id}`);
          }

          const data = await response.json();
          console.log(`Comments count for post ${post.id}:`, data); // Log data dari API
          counts[post.id] = data.total_comments || 0; // Ambil total_comments dari respons
        } catch (error) {
          console.error(`Error fetching comments count for post ${post.id}:`, error);
          counts[post.id] = 0; // Jika ada error, set ke 0
        }
      })
    );
    setCommentsCount(counts);
  };

  const handleCommentClick = (postId) => {
    console.log(`Opening comments modal for post ID: ${postId}`);
    console.log(`Current comment count: ${commentsCount[postId]}`);
    setCurrentPostId(postId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (profil) {
      fetchLikeData(posts);
    }
  }, [profil, posts]); // Tambahkan profil sebagai dependensi// Menambahkan posts sebagai dependensi

  const fetchLikeData = async (postsData) => {
    const token = localStorage.getItem("token");
    if (!token || !profil?.pengguna_id) return;

    try {
      const likeCheckResponse = await fetch(`${API_ENDPOINTS.suka}/${profil.pengguna_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const likedData = await likeCheckResponse.json();
      const likedMapping = {};
      likedData.data.forEach(like => {
        likedMapping[like.produk_id] = true;
      });
      setLikedPosts(likedMapping);

      const likeCountsData = await Promise.all(
        postsData.map(post => fetchWithAuth(API_ENDPOINTS.count(post.id)))
      );

      const newLikeCounts = {};
      likeCountsData.forEach((data, index) => {
        newLikeCounts[postsData[index].id] = data.total || 0;
      });
      setLikeCounts(newLikeCounts);

    } catch (error) {
      console.error("Error fetching like data:", error);
    }
  };

  const handleLikeClick = async (postId) => {
    if (!profil || !profil.pengguna_id) {
      alert('Data profil tidak tersedia. Silakan login kembali.');
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    try {
      const likeCheckResponse = await fetch(`${API_ENDPOINTS.suka}/${profil.pengguna_id}/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const likeCheckData = await likeCheckResponse.json();
      const isCurrentlyLiked = likeCheckData.data.length > 0;

      const method = isCurrentlyLiked ? 'DELETE' : 'POST';

      await fetch(API_ENDPOINTS.suka, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          penggunaId: profil.pengguna_id,
          produkId: postId
        }),
      });

      setLikedPosts(prev => ({
        ...prev,
        [postId]: !isCurrentlyLiked,
      }));

      const likeCountResponse = await fetch(API_ENDPOINTS.count(postId), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const likeCountData = await likeCountResponse.json();
      setLikeCounts(prev => ({
        ...prev,
        [postId]: likeCountData.total || 0,
      }));

    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Gagal memperbarui suka: ' + error.message);
    }
  };

  const PostImage = ({ images, nama }) => {
    if (Array.isArray(images)) {
      return (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {images.map((image, idx) => (
            <img key={idx} src={image} alt={`Image ${idx + 1}`} className="w-full rounded-lg" />
          ))}
        </div>
      );
    }

    if (images) {
      return (
        <img
          src={`${API_BASE_URL}${images}`}
          alt={nama}
          className="w-full rounded-lg mt-3"
        />
      );
    }

    return null;
  };

  const UserAvatar = ({ image, name, onClick }) => (
    <img
      src={image ? `${API_BASE_URL}${image}` : "/assets/banner.png"}
      alt={name || "Anonymous"}
      className="w-10 h-10 rounded-full mr-3 cursor-pointer"
      onClick={onClick}
    />
  );

  return (
    <div className="flex max-w-screen-xl mx-auto">
      <main className="flex-1 pr-5">
        <div className="text-center m-6">
          <button
            onClick={() => navigate("/tambah-produk")}
            className="w-12 h-12 bg-green-500 text-white rounded-full text-2xl hover:bg-green-600 focus:outline-none transition relative"
          >
            <FaPlus className="absolute inset-0 m-auto" />
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-5 mb-5 shadow-md">
              <div className="flex items-center mb-3">
                <UserAvatar
                  image={post.pengguna_gambar}
                  name={post.pengguna_nama}
                  onClick={() => navigate(`/detail-pasar/${post.pengguna_id}`)}
                />
                <span
                  className="font-bold text-lx cursor-pointer"
                  onClick={() => navigate(`/detail-pasar/${post.pengguna_id}`)}
                >
                  {post.pengguna_nama || "Pengguna"}
                </span>
              </div>

              <div className="text-gray-600">
                <p>Harga: {post.harga || "Tidak tersedia"}</p>
                <p>Lokasi: {post.lokasi || "Tidak diketahui"}</p>
                {expandedPosts[post.id] && (
                  <>
                    <p>Stok: {post.stok || "Habis"}</p>
                    <p>Kategori: {post.kategori_nama || "Tidak ada"}</p>
                    <p>{post.deskripsi || "Deskripsi tidak tersedia"}</p>
                  </>
                )}
                <button
                  onClick={() => setExpandedPosts(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                  className="text-blue-500 mt-2"
                >
                  {expandedPosts[post.id] ? "Baca Lebih Sedikit" : "Baca Selengkapnya"}
                </button>
              </div>

              <img
  src={post.gambar ? `${API_BASE_URL}/uploads/${post.gambar}` : "/assets/placeholder.jpg"}
  alt={post.nama || "Gambar tidak tersedia"}
  className="w-full rounded-lg mt-3"
/>

              <div className="flex justify-between items-center text-gray-600 mt-3 space-x-4">
                <button
                  onClick={() => handleLikeClick(post.id)}
                  className={`flex items-center text-lg transition duration-200 ${likedPosts[post.id] ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
                    }`}
                >
                  <FaThumbsUp className="mr-2 text-2xl" />
                  {likeCounts[post.id] || 0}
                </button>

                <button
                  onClick={() => handleCommentClick(post.id)}
                  className="flex items-center text-lg text-green-500 hover:text-green-700 transition duration-200"
                >
                  <FaComment className="mr-2 text-2xl" />
                  {commentsCount[post.id] || 0}
                </button>
              </div>

              {isModalOpen && currentPostId === post.id && (
                <KomentarModal postId={post.id} onClose={() => {
                  setIsModalOpen(false);
                  setCurrentPostId(null);
                }} />
              )}
            </div>
          ))
        ) : (
          <p>Tidak ada produk tersedia</p>
        )}
      </main>

      <aside className="w-96 bg-white p-5 lg:block hidden">
        <div className="user-saran">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saran</h2>
          {Array.isArray(sarans) && sarans.length > 0 ? (
            sarans.map((saran) => (
              <div key={saran.pengguna_id} className="flex items-center mb-4">
                <UserAvatar
                  image={saran.profil_gambar}
                  name={saran.profil_nama}
                  onClick={() => navigate(`/detail-pasar/${saran.pengguna_id}`)}
                />
                <span
                  className="text-gray-800 cursor-pointer"
                  onClick={() => navigate(`/detail-pasar/${saran.pengguna_id}`)}
                >
                  {saran.pengguna_nama || "Pengguna"}
                </span>
              </div>
            ))
          ) : (
            <p>Tidak ada saran yang tersedia.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

export default Pasar;