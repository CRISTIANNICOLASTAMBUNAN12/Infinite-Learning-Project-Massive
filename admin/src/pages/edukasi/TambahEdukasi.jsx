import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahEdukasi = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEdukasi = {
      id: Date.now(), // Generate a unique ID for the new edukasi
      title,
      description,
      imageUrl,
      date: new Date().toLocaleDateString(),
      status: 'draft', // Set default status to draft
    };
    // Assuming we are adding the new edukasi to a global state or API here
    console.log('Artikel Baru:', newEdukasi);
    navigate('/edukasi'); // Redirect back to the Edukasi page
  };

  return (
    <div className="p-6 bg-softCream bg-white">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Tambah Artikel Edukasi</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg text-gray-700">Judul Artikel</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg text-gray-700">Deskripsi</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="5"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-lg text-gray-700">URL Gambar</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Simpan Edukasi
        </button>
      </form>
    </div>
  );
};

export default TambahEdukasi;
