import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahBerita = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('draft');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, date, status, imageUrl });
    navigate('/berita'); // Kembali ke halaman berita setelah submit
  };

  // Fungsi untuk tombol kembali
  const handleBack = () => {
    navigate('/berita'); // Redirect ke halaman daftar berita
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className='text-center pb-4'>
          <h1 className="text-2xl font-medium text-gray-800">Tambah Berita Baru</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="title">
              Judul Berita
            </label>
            <input
              type="text"
              id="title"
              placeholder="Masukkan judul berita"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="date">
              Tanggal
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="imageUrl">
              URL Gambar Berita
            </label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Masukkan URL gambar berita"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-4">
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
    </div>
  );
};

export default TambahBerita;
