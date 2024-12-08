import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Beranda() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/kategori")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const navigate = useNavigate();
  const handleLogin = () => navigate(`/login`);
  const handleRegister = () => navigate(`/register`);

  return (
    <div>
      <div className="font-sans">
        {/* Banner */}
        <section
          className="relative text-center text-white bg-cover bg-center h-screen"
          style={{ backgroundImage: "url('/assets/banner.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 text-center z-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Solusi Digital untuk Masa Depan Pertanian
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-md mx-auto">
              Platform yang mendukung kemajuan teknologi dan keberlanjutan bagi
              para petani.
            </p>
            <button
              className="mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-10 rounded-full text-xl font-bold"
              onClick={handleRegister}
            >
              Mulai Sekarang
            </button>
          </div>
        </section>

        {/* Edukasi Section */}
        <section className="py-20 px-8 bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-green-700">
              Edukasi Pertanian
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              Temukan wawasan menarik untuk mendukung kesuksesan Anda.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all"
                  onClick={() => navigate(`/edukasi?kategori=${category.id}`)}
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={`/assets/${category.image}`}
                      alt={category.nama}
                      className="w-24 h-24 object-cover rounded-full border-4 border-green-700"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 text-center">
                    {category.nama}
                  </h3>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-600">
                Loading categories...
              </p>
            )}
          </div>
        </section>

        {/* Keunggulan Platform */}
        <section className="py-20 px-8 bg-gradient-to-r from-green-50 to-green-100">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-green-700">
              Keunggulan Platform
            </h2>
            <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
              Mengapa memilih kami? Kami menghadirkan solusi terbaik untuk
              pertanian Anda dengan teknologi inovatif.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
            {[
              {
                icon: "🌱",
                title: "Dukungan Petani",
                desc: "Membantu petani memanfaatkan teknologi untuk hasil yang lebih maksimal.",
              },
              {
                icon: "📈",
                title: "Meningkatkan Produktivitas",
                desc: "Menghubungkan petani dengan pasar baru untuk pertumbuhan yang berkelanjutan.",
              },
              {
                icon: "🤝",
                title: "Komunitas yang Terhubung",
                desc: "Menciptakan ruang kolaborasi untuk berbagi wawasan dan pengalaman.",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <h3 className="text-xl font-semibold text-green-700">
                  {stat.title}
                </h3>
                <p className="mt-4 text-gray-700">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kolaborasi dan Mitra */}
        <section className="py-20 px-8 bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-green-700">
              Kolaborasi dan Mitra Kami
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              Kami bekerja sama dengan berbagai pihak untuk menghadirkan solusi
              terbaik bagi petani.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-center items-center">
            {[
              "/assets/partner1.png",
              "/assets/partner2.png",
              "/assets/partner3.png",
              "/assets/partner4.png",
              "/assets/partner5.png",
            ].map((logo, index) => (
              <div
                key={index}
                className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <img
                  src={logo}
                  alt={`Mitra ${index + 1}`}
                  className="max-w-full h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Tentang Kami */}
        <section className="py-20 px-8 bg-gradient-to-r from-green-50 to-green-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-green-700">
              Tentang Kami
            </h2>
            <p className="mt-6 text-lg text-gray-800">
              Kami adalah platform inovatif yang menghubungkan petani dengan
              teknologi, pasar, dan komunitas. Misi kami adalah membantu petani
              meningkatkan produktivitas, mendukung keberlanjutan, dan
              menciptakan ekosistem pertanian yang lebih kuat melalui kolaborasi
              dan solusi modern.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              {
                title: "Misi Kami",
                desc: "Memberdayakan petani dengan akses ke teknologi canggih, pasar yang luas, dan komunitas yang mendukung.",
              },
              {
                title: "Visi Kami",
                desc: "Menciptakan ekosistem pertanian digital yang inklusif, inovatif, dan berkelanjutan.",
              },
              {
                title: "Nilai-Nilai Kami",
                desc: "Kami berkomitmen pada keberlanjutan, inovasi, kolaborasi, dan pemberdayaan petani.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-xl p-8 rounded-xl w-full sm:w-1/2 lg:w-1/3 hover:scale-105 transition-all"
              >
                <h3 className="text-2xl font-semibold text-green-700">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Beranda;
