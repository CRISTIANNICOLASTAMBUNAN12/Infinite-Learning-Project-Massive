import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEdukasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edukasi, setEdukasi] = useState(null);

  useEffect(() => {
    // Here you would fetch the edukasi data from an API or global state
    const fetchedEdukasi = {
      id,
      title: 'Teknik Pertanian Organik yang Efektif',
      date: '2024-11-05',
      imageUrl: 'https://example.com/edukasi1.jpg',
      description: 'Pelajari cara bertani organik yang efektif untuk meningkatkan hasil panen tanpa merusak lingkungan.',
      status: 'published',
    };
    setEdukasi(fetchedEdukasi);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEdukasi = {
      ...edukasi,
      title: edukasi.title,
      description: edukasi.description,
      imageUrl: edukasi.imageUrl,
      date: new Date().toLocaleDateString(),
    };
    // Here, you would update the edukasi in your API or global state
    console.log('Artikel Diperbarui:', updatedEdukasi);
    navigate(`/edukasi/detail/${id}`); // Redirect to the detail page
  };

  if (!edukasi) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-softCream bg-white">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Edit Artikel Edukasi</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg text-gray-700">Judul Artikel</label>
          <input
            type="text"
            id="title"
            value={edukasi.title}
            onChange={(e) => setEdukasi({ ...edukasi, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg text-gray-700">Deskripsi</label>
          <textarea
            id="description"
            value={edukasi.description}
            onChange={(e) => setEdukasi({ ...edukasi, description: e.target.value })}
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
            value={edukasi.imageUrl}
            onChange={(e) => setEdukasi({ ...edukasi, imageUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Perbarui Artikel
        </button>
      </form>
    </div>
  );
};

export default EditEdukasi;
