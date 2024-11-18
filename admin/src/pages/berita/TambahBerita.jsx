import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const TambahBerita = () => {
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',  
    imageUrl: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/berita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judul: formData.judul,    // Mengirimkan judul
          konten: formData.konten, // Mengirimkan konten
          image_url: formData.imageUrl, // Menyertakan gambar meskipun backend tidak menggunakannya
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Berita berhasil ditambahkan');
        navigate('/berita'); // Redirect ke halaman daftar berita
      } else {
        toast.error(data.message || 'Gagal menambahkan berita');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menambahkan berita');
      console.error('Error adding news:', error);
    }
  };

  const handleBack = () => {
    navigate('/berita');
  };

  return (
    <div className="p-6 bg-white h-full w-full">
      <div className="text-center pb-4">
        <h1 className="text-2xl font-medium text-gray-800 p-10">Tambah Berita Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Judul Berita</label>
          <input
            type="text"
            name="judul"
            placeholder="Masukkan judul berita"
            value={formData.judul}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Konten Berita</label>
          <textarea
            name="konten"
            placeholder="Masukkan konten berita"
            value={formData.konten}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">URL Gambar Berita</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Masukkan URL gambar berita (opsional)"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between gap-10 pt-10">
          <button
            onClick={handleBack}
            type="button"
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Simpan Berita
          </button>
        </div>  
      </form>
    </div>
  );
};

export default TambahBerita;
