import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState({ title: '', date: '', status: 'draft', imageUrl: '' });

  // Mengambil data berita berdasarkan ID untuk diedit
  useEffect(() => {
    const beritaData = {
      1: { title: 'Peningkatan Produksi Tanaman Padi', date: '2024-11-01', status: 'published', imageUrl: 'https://via.placeholder.com/800x400' },
      2: { title: 'Mengenal Teknologi Pertanian Modern', date: '2024-10-15', status: 'draft', imageUrl: 'https://via.placeholder.com/800x400' },
      3: { title: 'Strategi Pengendalian Hama Tanaman', date: '2024-09-25', status: 'published', imageUrl: 'https://via.placeholder.com/800x400' },
    };
    setBerita(beritaData[id]);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Berita setelah diedit:', berita);
    navigate('/berita');
  };

  const handleBack = () => {
    navigate('/berita');
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className='text-center pb-4'>
          <h1 className="text-2xl font-medium text-gray-800">Edit Berita</h1>
        </div>
        {berita.imageUrl && (
          <div className="mb-6">
            <img
              src={berita.imageUrl}
              alt="Preview Gambar Berita"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Judul Berita</label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
              value={berita.title}
              onChange={(e) => setBerita({ ...berita, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-lg font-semibold text-gray-700">Tanggal</label>
            <input
              type="date"
              id="date"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={berita.date}
              onChange={(e) => setBerita({ ...berita, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-lg font-semibold text-gray-700">Status</label>
            <select
              id="status"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={berita.status}
              onChange={(e) => setBerita({ ...berita, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-lg font-semibold text-gray-700">URL Gambar Berita</label>
            <input
              type="text"
              id="imageUrl"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
              value={berita.imageUrl}
              onChange={(e) => setBerita({ ...berita, imageUrl: e.target.value })}
              placeholder="Masukkan URL gambar"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Kembali
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBerita;
