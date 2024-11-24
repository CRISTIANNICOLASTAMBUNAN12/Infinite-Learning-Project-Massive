import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        if (!token) {
          toast.error('Token tidak ditemukan');
          return;
        }

        const response = await fetch(`http://localhost:4000/api/berita/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || 'Data tidak ditemukan');
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.gambar && !data.gambar.startsWith('http')) {
          data.gambar = `http://localhost:4000${data.gambar}`;
        }

        setBerita(data);
      } catch (error) {
        toast.error('Terjadi kesalahan saat memuat berita');
        console.error('Error fetching berita:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  const handleBack = () => {
    navigate('/berita');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"></div>
            <p className="ml-4 text-gray-600">Memuat berita...</p>
          </div>
        ) : berita ? (
          <div className="p-6">
            <div className="relative mb-6 flex justify-center items-center">
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="h-auto max-h-96 max-w-96 object-cover rounded-md shadow-sm"
              />
            </div>

            <hr className='p-4'/>

            <h1 className="text-2xl font-semibold text-gray-800 mb-4">{berita.judul}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{berita.konten}</p>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleBack}
                className="py-2 px-6 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
              >
                Kembali
              </button>
              <button
                onClick={() => navigate(`/berita/edit/${id}`)}
                className="py-2 px-6 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
              >
                Edit Berita
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Berita tidak ditemukan</p>
        )}
      </div>
    </div>
  );
};

export default DetailBerita;
