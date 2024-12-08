import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Edukasi() {
  const [edukasiList, setEdukasiList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Fetch kategori untuk filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/kategori");
        if (!response.ok) {
          throw new Error("Gagal mengambil kategori");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch edukasi dengan filter kategori dan pencarian
  useEffect(() => {
    const fetchEdukasi = async () => {
      try {
        let url = "http://localhost:4000/api/edukasi?";
        if (selectedCategory) {
          url += `kategori=${selectedCategory}&`;
        }
        if (searchTerm) {
          url += `search=${searchTerm}&`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Gagal mengambil data edukasi");
        }
        const data = await response.json();
        setEdukasiList(data);
      } catch (error) {
        console.error("Error fetching edukasi:", error);
      }
    };

    fetchEdukasi();
  }, [searchTerm, selectedCategory]);

  // Set kategori dari parameter URL saat pertama kali dimuat
  useEffect(() => {
    const kategoriParam = searchParams.get("kategori");
    if (kategoriParam) {
      setSelectedCategory(kategoriParam);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center w-full h-full py-10 bg-gray-100">
      <div className="w-full max-w-7xl px-5">
        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 space-y-3 sm:space-y-0 sm:space-x-5">
          {/* Search */}
          <input
            type="text"
            placeholder="Cari Edukasi..."
            className="p-3 mb-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filter by Category */}
          <div className="relative inline-block w-full sm:w-1/3 lg:w-1/4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full p-3 pl-4 pr-10 text-base text-gray-700 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out hover:bg-gray-50 appearance-none"
            >
              <option
                value=""
                className="text-gray-500 bg-gray-100 hover:bg-gray-200 py-2"
              >
                Semua Kategori
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="text-gray-900 hover:bg-green-100 py-2"
                >
                  {category.nama}
                </option>
              ))}
            </select>

            {/* Custom Dropdown Arrow Icon */}
            <div className="absolute top-0 right-0 flex items-center justify-center w-10 h-full pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* List of Edukasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
          {edukasiList.map((edukasi) => (
            <div
              key={edukasi.id}
              className="bg-white rounded-lg shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-300"
              onClick={() => navigate(`/edukasi/${edukasi.id}`)}
            >
              <img
                src={
                  edukasi.gambar
                    ? `http://localhost:4000${edukasi.gambar}`
                    : "http://via.placeholder.com/150"
                }
                alt={edukasi.judul || "Edukasi Image"}
                className="w-full h-36 object-cover rounded-t-lg"
              />
              <div className="p-5">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <p>
                    {new Date(edukasi.diterbitkan_pada).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 truncate">
                  {edukasi.judul}
                </h3>
                <p className="text-sm text-gray-600">
                  {edukasi.konten.split(" ").length > 20
                    ? `${edukasi.konten.split(" ").slice(0, 20).join(" ")}...`
                    : edukasi.konten}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Edukasi;
