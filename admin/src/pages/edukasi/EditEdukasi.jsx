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
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Pelajari cara bertani organik yang efektif untuk meningkatkan hasil panen tanpa merusak lingkungan.',
      status: 'published',
    };
    setEdukasi(fetchedEdukasi);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Berita setelah diedit:', berita);
    navigate('/berita');
  };

  const handleBack = () => {
    navigate('/edukasi');
  };

  if (!edukasi) return <div>Loading...</div>;

  return (
    <div className="items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className='text-center pb-4'>
          <h1 className="text-2xl font-medium text-gray-800">Edit Edukasi</h1>
        </div>
        {edukasi.imageUrl && (
          <div className="mb-6">
            <div className="flex justify-center items-center">
              <img
                src={edukasi.imageUrl}
                alt="Preview Gambar Edukasi"
                className="h-48 object-cover rounded-md max-w-xl"
              />
            </div>
          </div>
        )}
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
          <div className="flex gap-20">
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
              Simpan Edukasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEdukasi;
