import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import facebookLogo from "../../assets/facebook.png";
import googleLogo from "../../assets/google.png";
import kemenkesLogo from "../../assets/kemen-kes-ri.png";
import kementerianPertanianLogo from "../../assets/Kementerian-Pertanian.png";
import tutLogo from "../../assets/TUT-WURI-HANDAYANI.png";
import google from "../../assets/google.png";

/**
 * Beranda Page
 *
 * This page renders the main landing page of the application.
 *
 * @returns {JSX.Element} The rendered page.
 */

function Beranda() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/kategori")
      .then((response) => response.json())
      .then((data) => {
        // console.log("Category data:", data); // Add this line
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const navigate = useNavigate();
  const handleRegister = () => navigate(`/register`);

  return (
    <div>
      <div className="font-sans">
        {/* Banner */}
        <section className="bg-primary my-5 mx-5">
          <div className="flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 max-w-screen-lg mx-auto">
            {/* ================= Left Side ================= */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[8vw] md:mb-[-30px]">
              <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
                Book Appointment <br /> With Trusted Doctors
              </p>

              <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                <img className="w-28" alt="Doctor Icon" />
                <p>
                  Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
                  schedule your appointment hassle-free
                </p>
              </div>

              <button
                onClick={handleRegister}
                className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
              >
                Book Appointment
              </button>
            </div>

            {/* ================= Right Side (Image) ================= */}
            <div className="md:w-1/2 relative">
              <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={google} alt="Doctor's Image" />
            </div>
          </div>
        </section>

        {/* Edukasi Section */}
        <section className="flex flex-col items-center gap-6 py-16 text-gray-800">
          <div className="text-center">
            <h1 className="text-3xl font-medium">
              Edukasi Pertanian
            </h1>
            <p className="mt-4 text-lg text-gray-800">
              Temukan wawasan menarik untuk mendukung kesuksesan Anda.
            </p>
          </div>
          <div className="flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto sm:overflow-x-hidden">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
                  onClick={() => navigate(`/edukasi?kategori=${category.id}`)}
                >
                  <img
                    src={`http://localhost:4000/uploads/${category.gambar}`}
                    alt={`Kategori: ${category.nama}`}
                    className="w-20 h-20 sm:w-20 rounded-full object-cover mx-4"
                  />
                  <p className="text-center mt-2">{category.nama}</p>
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
            <h1 className="text-3xl font-medium text-green-700">
              Keunggulan Platform
            </h1>
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
        <section className="flex flex-col items-center gap-4 py-16 text-gray-800">
          <div className="text-center">
            <h1 className="text-3xl font-medium">
              Kolaborasi dan Mitra Kami
            </h1>
            <p className="mt-4 text-lg text-gray-800">
              Kami bekerja sama dengan berbagai pihak untuk menghadirkan solusi
              terbaik bagi petani.
            </p>
          </div>
          <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto sm:overflow-x-hidden">
            {[facebookLogo, googleLogo, kemenkesLogo, kementerianPertanianLogo, tutLogo].map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  src={logo}
                  alt={`Mitra ${index + 1}`}
                  className="w-14 h-14 sm:w-14 rounded-full object-cover mx-4"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Tentang Kami */}
        <section className="py-20 px-8 bg-gradient-to-r from-green-50 to-green-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-medium text-green-700">
              Tentang Kami
            </h1>
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
