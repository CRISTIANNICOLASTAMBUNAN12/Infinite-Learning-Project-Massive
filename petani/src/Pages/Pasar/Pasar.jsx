import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaPlus } from "react-icons/fa";

function Pasar() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [sarans, setSarans] = useState([]); // For storing saran data
  const [profil, setProfil] = useState(null); // For storing user profile data
  const [expandedPosts, setExpandedPosts] = useState({});
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch("http://localhost:4000/api/produk", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchSarans = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch(
          "http://localhost:4000/api/pengguna/petani/saran",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSarans(data);
      } catch (error) {
        console.error("Error fetching user saran:", error);
      }
    };

    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch("http://localhost:4000/api/profil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfil(data.data); // Assuming data structure is { success: true, data: profilData }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchPosts();
    fetchSarans();
    fetchProfil();
  }, []);

  const handleTambahProdukClick = () => {
    navigate("/tambah-produk");
  };

  // Navigate to profile page
  const handleProfileClick = (userId) => {
    navigate(`/detail-pasar/${userId}`); // Arahkan ke DetailPasar dengan userId
  };

  const handleToggleDescription = (postId) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle the expanded state for the specific post
    }));
  };

  return (
    <div className="flex max-w-screen-xl mx-auto">
      <main className="flex-1 pr-5">
        <div className="text-center m-6">
          <button
            onClick={handleTambahProdukClick}
            className="w-12 h-12 bg-green-500 text-green-600 rounded-full text-2xl hover:bg-green-600 focus:outline-none transition relative"
          >
            <FaPlus className="text-white absolute inset-0 m-auto" />
          </button>
        </div>

        {/* Product Listings */}
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg p-5 mb-5 shadow-md">
              <div className="flex items-center mb-3">
                <img
                  src={
                    post.pengguna_gambar
                      ? `http://localhost:4000${post.pengguna_gambar}`
                      : "/assets/banner.png"
                  }
                  alt={post.pengguna_nama || "Anonymous"}
                  className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                  onClick={() => handleProfileClick(post.pengguna_id)}
                />
                <span
                  className="font-bold text-lx cursor-pointer"
                  onClick={() => handleProfileClick(post.pengguna_id)}
                >
                  {post.pengguna_nama || "Pengguna"}
                </span>
              </div>
              <div className="">
                <div className="text-gray-600">
                  <p>Harga: {post.harga || "Tidak tersedia"}</p>
                  {expandedPosts[post.id] ? (
                    <>
                      <p>Lokasi: {post.lokasi || "Tidak diketahui"}</p>
                      <p>Stok: {post.stok || "Habis"}</p>
                      <p>Kategori: {post.kategori_nama || "Tidak ada"}</p>
                      <p>{post.deskripsi || "Deskripsi tidak tersedia"}</p>
                    </>
                  ) : (
                    <>
                      <p>Lokasi: {post.lokasi || "Tidak diketahui"}</p>
                      <p>
                        {(post.deskripsi || "Deskripsi tidak tersedia").slice(
                          0,
                          0
                        ) + "..."}
                      </p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleToggleDescription(post.id)} // Toggle description for this specific post
                  className="text-blue-500 mt-2"
                >
                  {expandedPosts[post.id]
                    ? "Baca Lebih Sedikit"
                    : "Baca Selengkapnya"}
                </button>
              </div>
              {Array.isArray(post.gambar) ? (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {post.gambar.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Image ${idx + 1}`}
                      className="w-full rounded-lg"
                    />
                  ))}
                </div>
              ) : post.gambar ? (
                <img
                  src={
                    post.gambar
                      ? `http://localhost:4000${post.gambar}`
                      : "/assets/placeholder.jpg"
                  }
                  alt={post.nama}
                  className="w-full rounded-lg mt-3"
                />
              ) : null}
              <div className="flex justify-between items-center text-gray-600 mt-3">
                <span>👍 {post.suka || 0}</span>
                <span>💬 {post.produk_komentar || 0}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada produk yang tersedia.</p>
        )}
      </main>

      <div className="w-96 flex flex-col lg:block hidden">
        {" "}
        {/* Hide on smaller screens */}
        <aside className="bg-white p-5">
          <div className="user-saran">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saran</h2>
            {Array.isArray(sarans) && sarans.length > 0 ? (
              sarans.map((saran, index) => (
                <div key={index} className="flex items-center mb-4">
                  <img
                    src={
                      saran.profil_gambar
                        ? `http://localhost:4000${saran.profil_gambar}`
                        : "/assets/default-profile.png"
                    }
                    alt={saran.profil_nama || "Anonymous"}
                    className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                    onClick={() => handleProfileClick(saran.pengguna_id)} // Handle click to go to the profile page
                  />
                  <span
                    className="text-gray-800 cursor-pointer"
                    onClick={() => handleProfileClick(saran.pengguna_id)} // Handle click to go to the profile page
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
    </div>
  );
}

export default Pasar;
