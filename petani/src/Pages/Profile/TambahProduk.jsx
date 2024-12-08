import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";

const TambahProduk = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    kategori_id: "",
    harga: "",
    lokasi: "",
    stok: "",
    gambar: "",
  });
  const [kategoriList, setKategoriList] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch kategori list dari backend
  const fetchKategori = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/kategori");
      const data = await response.json();
      setKategoriList(data);
    } catch (error) {
      toast.error("Gagal mengambil kategori");
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setFormData({ ...formData, [name]: files[0] });
      handleImageChange(e);
      setIsImageSelected(true);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, gambar: "" });
    setIsImageSelected(false);
    setPreviewImage(null);
    document.getElementById("gambarInput").value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:4000/api/produk", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Produk berhasil ditambahkan");
        navigate("/profil");
      } else {
        toast.error(data.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/profil");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Tambah Hasil Panen
        </h1>
      </div>

      <div className="pb-10">
        {previewImage && (
          <div className="flex justify-center mb-4">
            <img
              src={previewImage}
              alt="Preview Gambar"
              className="object-cover h-auto max-h-96 max-w-full rounded-md shadow-md"
            />
          </div>
        )}

        {previewImage && (
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="px-4 text-red-500 hover:text-red-700 font-semibold rounded-lg flex items-center gap-2"
            >
              <FaTimesCircle size={20} />
              Hapus Perubahan
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nama Produk
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            rows="4"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            name="kategori_id"
            value={formData.kategori_id}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Pilih Kategori</option>
            {kategoriList.map((kategori) => (
              <option key={kategori.id} value={kategori.id}>
                {kategori.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Harga (Rp)
          </label>
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Lokasi
          </label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Stok
          </label>
          <input
            type="number"
            name="stok"
            value={formData.stok}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Gambar Produk
          </label>
          <div className="relative">
            <input
              type="file"
              name="gambar"
              id="gambarInput"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handleBack}
            type="button"
            className="w-1/2 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none"
          >
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahProduk;
