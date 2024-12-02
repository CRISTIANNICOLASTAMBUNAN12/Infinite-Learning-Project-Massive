import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailEdukasi() {
  const { id } = useParams(); // Mengambil id dari URL
  const [edukasi, setEdukasi] = useState(null);

  // Fetch detail edukasi berdasarkan ID
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

  if (!edukasi) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full py-10">
      <div className="w-full max-w-7xl px-5">
        <div className="bg-[#7BA651] rounded-lg shadow-md">
          <img
            src={edukasi.gambar ? `http://localhost:4000${edukasi.gambar}` : 'http://via.placeholder.com/150'}
            alt={edukasi.judul || 'Edukasi Image'}
            className="w-full h-72 object-cover rounded-t-lg"
          />
          <div className="p-5">
            <h2 className="text-3xl font-semibold text-white mb-4">{edukasi.judul}</h2>
            <p className="text-white text-sm mb-4">
              {new Date(edukasi.diterbitkan_pada).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-white">{edukasi.konten}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEdukasi;
