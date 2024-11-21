import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailEdukasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edukasi, setEdukasi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdukasiById = async () => {
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        if (!token) {
          toast.error('Token tidak ditemukan');
          return;
        }

        const response = await fetch(`http://localhost:4000/api/edukasi/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`Gagal mengambil data edukasi: ${errorData.message}`);
          setLoading(false);
          return;
        }

        const data = await response.json();

        // Tambahkan base URL jika gambar tidak memiliki URL absolut
        if (data.gambar && !data.gambar.startsWith('http')) {
          data.gambar = `http://localhost:4000${data.gambar}`;
        }

        setEdukasi(data);
      } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil data edukasi');
        console.error('Error fetching edukasi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdukasiById();
  }, [id]);

  const handleBack = () => {
    navigate('/edukasi');
  };

  return (
    <div className="p-6 bg-white h-full w-full">
      <div className="pt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
            <p className="ml-4 text-gray-600">Memuat data edukasi...</p>
          </div>
        ) : edukasi ? (
          <div className="mb-6">
            <div className="relative flex justify-center items-center">
              <img
                src={edukasi.gambar || 'https://via.placeholder.com/800x400'}
                alt={edukasi.judul || 'Gambar Edukasi'}
                className="h-auto max-h-96 max-w-96 object-cover rounded-md"
              />
            </div>

            <div className="p-10 mx-20">
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-4">
                {edukasi.judul}
              </h1>
              <p className="text-sm sm:text-base text-gray-500 mb-4">
                {(() => {
                  const date = new Date(edukasi.diterbitkan_pada);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = date.getFullYear();
                  return `${day}/${month}/${year}`;
                })()}
              </p>
              <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed">
                {edukasi.konten}
              </p>
              <div className="flex justify-between gap-10 pt-10">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  Kembali
                </button>
                <button
                  onClick={() => navigate(`/edukasi/edit/${id}`)}
                  className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  Edit Edukasi
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Edukasi tidak ditemukan</p>
        )}
      </div>
    </div>
  );
};

export default DetailEdukasi;
