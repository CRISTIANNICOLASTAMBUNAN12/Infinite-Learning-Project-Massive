import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailProduk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const API_BASE_URL = 'http://localhost:4000';

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;

    try {
      new URL(imagePath);
      return imagePath;
    } catch {
      if (imagePath.startsWith('/uploads/')) {
        return `${API_BASE_URL}${imagePath}`;
      } else if (imagePath.startsWith('uploads/')) {
        return `${API_BASE_URL}/${imagePath}`;
      } else {
        return `${API_BASE_URL}/uploads/${imagePath}`;
      }
    }
  };

  const validateImageUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchProdukById = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token tidak ditemukan');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/produk/produkPetani/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`Gagal mengambil data produk: ${errorData.message}`);
          setLoading(false);
          return;
        }

        const data = await response.json();

        // Validate and format image URL
        if (data.gambar) {
          const fullImageUrl = getFullImageUrl(data.gambar);
          if (validateImageUrl(fullImageUrl)) {
            data.gambar = fullImageUrl;
          } else {
            data.gambar = null;
            console.warn('Invalid image URL format:', data.gambar);
          }
        }

        setProduk(data);
      } catch (error) {
        console.error('Error fetching produk:', error);
        toast.error('Terjadi kesalahan saat mengambil data produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProdukById();
  }, [id]);

  const handleBack = () => {
    navigate('/produk');
  };

  const handleImageError = () => {
    setImageError(true);
    console.warn('Failed to load image:', produk?.gambar);
  };

  const ImagePlaceholder = () => (
    <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-md">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-500">Gambar tidak tersedia</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"></div>
            <p className="ml-4 text-gray-600">Memuat produk...</p>
          </div>
        ) : produk ? (
          <div className="p-6">
            <div className="relative mb-6 flex justify-center items-center">
              {produk.gambar && !imageError ? (
                <div className="w-full max-w-2xl aspect-video relative">
                  <img
                    src={produk.gambar}
                    alt={produk.nama}
                    className="w-full h-full object-contain rounded-md shadow-sm"
                    onError={handleImageError}
                  />
                </div>
              ) : (
                <ImagePlaceholder />
              )}
            </div>

            <hr className="my-6" />

            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-gray-800">{produk.nama}</h1>
              <p className="text-sm text-gray-500">
                {new Date(produk.dibuat_pada).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">{produk.deskripsi || 'Tidak ada deskripsi'}</p>
              <p className="text-xl text-gray-800 font-semibold">
                Rp {parseInt(produk.harga).toLocaleString('id-ID')}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Stok:</span> {produk.stok}
                </div>
                <div>
                  <span className="font-medium">Lokasi:</span> {produk.lokasi}
                </div>
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <button
                  onClick={handleBack}
                  className="py-2 px-6 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-600">Produk tidak ditemukan</div>
        )}
      </div>
    </div>
  );
};

export default DetailProduk;