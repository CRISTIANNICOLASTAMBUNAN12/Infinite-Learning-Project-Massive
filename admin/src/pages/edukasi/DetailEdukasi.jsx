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
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token tidak ditemukan');
          return;
        }

        const response = await fetch(`http://localhost:4000/api/edukasi/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`Gagal mengambil data edukasi: ${errorData.message}`);
          setLoading(false);
          return;
        }

        const data = await response.json();

        // Add a base URL if the image does not have an absolute URL
        if (data.gambar && !/^https?:\/\//.test(data.gambar)) {
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

  const handleBack = () => navigate('/edukasi');
  const handleEdit = () => navigate(`/edukasi/edit/${id}`);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"></div>
            <p className="ml-4 text-gray-600">Memuat edukasi...</p>
          </div>
        ) : edukasi ? (
          <div className="p-6">
            <div className="relative mb-6 flex justify-center items-center">
              <img
                src={edukasi.gambar}
                alt={edukasi.judul}
                className="h-auto max-h-96 max-w-96 object-cover rounded-md shadow-sm"
              />
            </div>

            <hr className="my-4" />

            <h1 className="text-2xl font-semibold text-gray-800 mb-4">{edukasi.judul}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(edukasi.diterbitkan_pada).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{edukasi.konten}</p>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleBack}
                className="py-2 px-6 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
              >
                Kembali
              </button>
              <button
                onClick={handleEdit}
                className="py-2 px-6 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition"
              >
                Edit Edukasi
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-600">Edukasi tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailEdukasi;
