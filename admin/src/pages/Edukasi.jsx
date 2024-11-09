import React, { useState } from 'react';

const Edukasi = () => {
  // Contoh data artikel edukasi (ini bisa diganti dengan data dari API)
  const edukasiList = [
    {
      id: 1,
      title: 'Teknik Pertanian Organik yang Efektif',
      date: '2024-11-05',
      imageUrl: 'https://example.com/edukasi1.jpg', // Gambar edukasi
      description: 'Pelajari cara bertani organik yang efektif untuk meningkatkan hasil panen tanpa merusak lingkungan.',
    },
    {
      id: 2,
      title: 'Inovasi Teknologi dalam Pertanian',
      date: '2024-10-25',
      imageUrl: 'https://example.com/edukasi2.jpg', // Gambar edukasi
      description: 'Temukan inovasi terbaru dalam teknologi pertanian yang dapat membantu petani meningkatkan efisiensi.',
    },
    {
      id: 3,
      title: 'Cara Mengatasi Penyakit Tanaman dengan Ramuan Alami',
      date: '2024-09-20',
      imageUrl: 'https://example.com/edukasi3.jpg', // Gambar edukasi
      description: 'Pelajari bagaimana cara alami untuk mengatasi hama dan penyakit pada tanaman secara ramah lingkungan.',
    },
  ];

  const handleEdit = (id) => {
    // Fungsi untuk mengedit artikel edukasi
    console.log('Edit artikel edukasi dengan ID:', id);
  };

  const handleDelete = (id) => {
    // Fungsi untuk menghapus artikel edukasi
    console.log('Hapus artikel edukasi dengan ID:', id);
  };

  const handleAddArticle = () => {
    // Fungsi untuk menambah artikel edukasi baru
    console.log('Tambah artikel edukasi baru');
  };

  return (
    <div className="p-6 min-h-screen bg-softCream">
      <h1 className="text-3xl font-bold mb-6">Manajemen Artikel Edukasi</h1>

      {/* Tombol untuk menambah artikel edukasi */}
      <button 
        onClick={handleAddArticle} 
        className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4">
        Tambah Artikel Edukasi
      </button>

      {/* Daftar Artikel Edukasi */}
      <div className="space-y-4">
        {edukasiList.map((artikel) => (
          <div key={artikel.id} className="flex bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={artikel.imageUrl}
              alt={artikel.title}
              className="w-40 h-40 object-cover"
            />
            <div className="p-6 flex-1">
              <h3 className="text-xl font-bold mb-2">{artikel.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{artikel.date}</p>
              <p className="text-gray-800 mb-4">{artikel.description}</p>
              <button
                onClick={() => handleEdit(artikel.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(artikel.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Edukasi;
