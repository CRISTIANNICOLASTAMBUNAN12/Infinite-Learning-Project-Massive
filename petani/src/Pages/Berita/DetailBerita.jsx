import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailBerita() {
  const { id } = useParams(); // Mendapatkan ID berita dari URL
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
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!berita) {
    return (
      <div className="text-center py-10">
        <p>Berita tidak ditemukan</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mt-4 text-white bg-[#7BA651] rounded"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full py-10 px-5">
      <div className="max-w-4xl w-full bg-white rounded-md shadow-md">
        <img
          src={
            berita.gambar
              ? `http://localhost:4000${berita.gambar}`
              : 'http://via.placeholder.com/150'
          }
          alt={berita.judul}
          className="w-full h-64 object-cover rounded-t-md"
        />
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">{berita.judul}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="text-gray-700 leading-relaxed">{berita.konten}</p>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mt-4 text-white bg-[#7BA651] rounded"
      >
        Kembali
      </button>
    </div>
  );
}

export default DetailBerita;
