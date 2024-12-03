import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Beranda() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/kategori") // Sesuaikan URL endpoint API Anda
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleRegister = () => {
    navigate(`/register`);
  };

  return (
    <div className="">
      {/* Banner */}
      <section className="relative text-center text-white">
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 px-8 max-w-[900px] text-left">
          <h1 className="text-5xl font-extrabold text-white font-inter">
            Selamat Datang
          </h1>
          <p className="my-4 text-lg">
            Memberikan akses mudah bagi petani untuk berbagi pengetahuan,
            berinteraksi, dan memasarkan hasil pertanian.
          </p>
          <button
            className="bg-white text-black py-3 px-14 rounded-full text-2xl font-bold"
            onClick={handleRegister}
          >
            Daftar
          </button>
        </div>
        <img
          src="/assets/banner.png"
          alt="Farmer in field"
          className="w-full h-full-auto"
        />
      </section>

      {/* Blog Section */}
      <section className="p-8 text-center">
        <div className="text-[#8D5524] text-4xl font-outfit font-bold">
          Blog
        </div>
        <p className="mt-4 mb-8">
          Jelajahi artikel-artikel terbaru mengenai teknik bertani, tips
          berkebun, dan informasi penting tentang pertanian lokal. Temukan
          wawasan dan inspirasi untuk mendukung pertanian yang berkelanjutan.
        </p>
        <div className="flex justify-center gap-20 flex-wrap mb-8">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="text-center cursor-pointer"
                onClick={() => navigate(`/edukasi?kategori=${category.id}`)}
              >
                <img src={`/assets/${category.image}`} alt={category.nama} />
                <p>{category.nama}</p>
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </section>

      {/* Selection Section */}
      <section className="p-8">
        <center>
          <div className="text-[#8D5524] text-4xl font-outfit font-bold">
            Pilihan Kami
          </div>
        </center>
        <p className="mt-4 text-center text-white mb-8">
          Di bawah ini, Anda bisa membaca blog terbaru mengenai perkembangan dan
          inovasi di bidang pertanian.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mx-[14%]">
          {[
            {
              title: "Manfaat Drone dalam Pemantauan Pertanian",
              date: "28/10/2024",
              author: "John Doe",
              image: "drone.png",
            },
            {
              title: "Panduan Budi Daya Sayuran Hidroponik",
              date: "28/10/2024",
              author: "Jane Smith",
              image: "carrot.png",
            },
            {
              title: "Meningkatkan Kesehatan dengan Pertanian Terpadu",
              date: "28/10/2024",
              author: "Mark Lee",
              image: "healthy-farming.png",
            },
            {
              title: "Penggunaan Pupuk Organik untuk Hasil Maksimal",
              date: "28/10/2024",
              author: "Sarah Johnson",
              image: "organic-fertilizer.png",
            },
            {
              title: "Menggunakan Pupuk Organik untuk Hasil Optimal",
              date: "28/10/2024",
              author: "Alice Brown",
              image: "pest-control.png",
            },
            {
              title: "Teknologi Terbaru di Industri Pertanian",
              date: "28/10/2024",
              author: "Paul Green",
              image: "technology.png",
            },
          ].map((post, index) => (
            <div
              key={index}
              className="bg-[#8D5524] border border-gray-300 shadow-lg rounded-lg w-[320px] h-[400px] mb-6 flex flex-col overflow-hidden"
            >
              <img
                src={`/assets/${post.image}`}
                alt={post.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="px-4 py-3 flex flex-col flex-grow">
                <span className="text-white mb-2">KATEGORI BLOG</span>
                <h3 className="text-white text-lg mb-2">{post.title}</h3>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#8D5524] text-[#666]">
                <div className="flex items-center">
                  <i className="fas fa-user-circle text-2xl text-[#333] mr-2"></i>
                  <p className="text-[#333] text-sm">{post.author}</p>
                </div>
                <p className="text-[#999] text-sm">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-[#4CAF50] text-white py-3 px-14 rounded-[20px] block mx-auto text-sm font-bold">
          Lainnya
        </button>
      </section>
    </div>
  );
}

export default Beranda;
