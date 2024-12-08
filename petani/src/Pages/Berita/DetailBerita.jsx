import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailBerita() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/berita/${id}`);
        if (!response.ok) {
          throw new Error('Berita tidak ditemukan');
        }
        const data = await response.json();
        setBerita(data);
      } catch (error) {
        console.error('Error fetching berita:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl font-semibold text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <p className="text-lg font-semibold text-gray-600">Berita tidak ditemukan</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={berita.gambar ? `http://localhost:4000${berita.gambar}` : 'http://via.placeholder.com/150'}
          alt={berita.judul}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">{berita.judul}</h1>
          <p className="text-sm text-gray-500 mb-6">
            {new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">{berita.konten}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailBerita;
