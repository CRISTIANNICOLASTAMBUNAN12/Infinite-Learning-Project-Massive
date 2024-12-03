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
    <div className="flex flex-col items-center w-full py-10">
      <div className="w-full max-w-7xl px-5">
        {/* Filter and Search */}
        <div className="flex justify-between items-center mb-5">
          {/* Search */}
          <input
            type="text"
            placeholder="Cari Edukasi..."
            className="p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filter by Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nama}
              </option>
            ))}
          </select>
        </div>

        {/* List of Edukasi */}
        <div className="grid grid-cols-4 gap-5 cursor-pointer">
          {edukasiList.map((edukasi) => (
            <div
              key={edukasi.id}
              className="bg-[#7BA651] rounded-lg shadow-md hover:transform hover:-translate-y-1 transition-transform duration-300"
              onClick={() => navigate(`/edukasi/${edukasi.id}`)}
            >
              <img
                src={edukasi.gambar ? `http://localhost:4000${edukasi.gambar}` : "http://via.placeholder.com/150"}
                alt={edukasi.judul || "Edukasi Image"}
                className="w-full h-36 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <div className="flex justify-between text-sm text-white mb-2">
                  <p className="text-sm text-gray-500">
                    {new Date(edukasi.diterbitkan_pada).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white truncate">{edukasi.judul}</h3>
                <p className="text-sm text-white">
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
