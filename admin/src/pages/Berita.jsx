import React, { useState } from 'react';

const Berita = () => {
  // Contoh data berita dengan gambar (ini bisa diganti dengan data dari API)
  const beritaList = [
    {
      id: 1,
      title: 'Peningkatan Produksi Tanaman Padi',
      date: '2024-11-01',
      status: 'published',
      imageUrl: 'https://example.com/berita1.jpg', // Gambar berita
    },
    {
      id: 2,
      title: 'Mengenal Teknologi Pertanian Modern',
      date: '2024-10-15',
      status: 'draft',
      imageUrl: 'https://example.com/berita2.jpg', // Gambar berita
    },
    {
      id: 3,
      title: 'Strategi Pengendalian Hama Tanaman',
      date: '2024-09-25',
      status: 'published',
      imageUrl: 'https://example.com/berita3.jpg', // Gambar berita
    },
  ];

  const handleEdit = (id) => {
    // Fungsi untuk mengedit berita
    console.log('Edit berita dengan ID:', id);
  };

  const handleDelete = (id) => {
    // Fungsi untuk menghapus berita
    console.log('Hapus berita dengan ID:', id);
  };

  const handleToggleStatus = (id) => {
    // Fungsi untuk mengubah status berita
    console.log('Ubah status berita dengan ID:', id);
  };

  return (
    <div className="p-6 min-h-screen bg-softCream">
      <h1 className="text-3xl font-bold mb-6">Manajemen Berita</h1>

      {/* Tombol untuk menambah berita baru */}
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4">Tambah Berita</button>

      {/* Tabel Daftar Berita */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Gambar</th>
              <th className="px-6 py-3">Judul</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {beritaList.map((berita) => (
              <tr key={berita.id} className="border-b">
                <td className="px-6 py-3">
                  <img
                    src={berita.imageUrl}
                    alt={berita.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-3">{berita.title}</td>
                <td className="px-6 py-3">{berita.date}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-4 py-2 rounded-full ${
                      berita.status === 'published' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                    }`}
                  >
                    {berita.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleEdit(berita.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(berita.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => handleToggleStatus(berita.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    {berita.status === 'published' ? 'Set Draft' : 'Publish'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Berita;
