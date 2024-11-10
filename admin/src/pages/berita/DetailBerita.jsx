import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetailBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);

  // Mengambil data berita berdasarkan ID
  useEffect(() => {
    const beritaData = {
      1: { title: 'Peningkatan Produksi Tanaman Padi', date: '2024-11-01', status: 'published', imageUrl: 'https://via.placeholder.com/800x400' },
      2: { title: 'Mengenal Teknologi Pertanian Modern', date: '2024-10-15', status: 'draft', imageUrl: 'https://via.placeholder.com/800x400' },
      3: { title: 'Strategi Pengendalian Hama Tanaman', date: '2024-09-25', status: 'published', imageUrl: 'https://via.placeholder.com/800x400' },
    };
    setBerita(beritaData[id]);
  }, [id]);

  const handleBack = () => {
    navigate('/berita');
  };

  return (
    <div className="items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg pt-10">
        {berita ? (
          <div className="mb-6">
            <div className="flex justify-center items-center">
              <img
                src={berita.imageUrl}
                alt={berita.title}
                className="h-48 object-cover rounded-md max-w-xl"
              />
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md">
                {berita.status === 'published' ? 'Dipublikasikan' : 'Draft'}
              </div>
            </div>

            <div className="p-10 mx-20">
              <h1 className="text-2xl font-medium text-gray-800 mb-4">{berita.title}</h1>
              <p className="text-sm text-gray-500 mb-4">Tanggal: {new Date(berita.date).toLocaleDateString()}</p>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                Artikel tentang {berita.title.toLowerCase()} memberikan informasi mengenai berbagai aspek yang perlu diperhatikan dalam dunia pertanian.
              </p>
              <div className="flex justify-between gap-6">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  Kembali
                </button>
                <button
                  onClick={() => navigate(`/berita/edit/${id}`)}
                  className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  Edit Berita
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
            <p className="ml-4 text-gray-600">Memuat data berita...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailBerita;
