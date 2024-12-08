import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailEdukasi() {
  const { id } = useParams();
  const [edukasi, setEdukasi] = useState(null);

  useEffect(() => {
    const fetchEdukasiDetail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/edukasi/${id}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil detail edukasi');
        }
        const data = await response.json();
        setEdukasi(data);
      } catch (error) {
        console.error('Error fetching detail edukasi:', error);
      }
    };

    fetchEdukasiDetail();
  }, [id]);

  if (!edukasi) return <div className="text-center py-10 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={edukasi.gambar ? `http://localhost:4000${edukasi.gambar}` : 'http://via.placeholder.com/150'}
            alt={edukasi.judul || 'Edukasi Image'}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">{edukasi.judul}</h2>
            <p className="text-sm text-gray-500">
              {new Date(edukasi.diterbitkan_pada).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-gray-700 leading-relaxed">{edukasi.konten}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEdukasi;
