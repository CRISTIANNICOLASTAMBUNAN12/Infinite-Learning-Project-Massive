import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { FaPen } from 'react-icons/fa';

function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isProduksLoading, setIsProduksLoading] = useState(true);
  const [error, setError] = useState(null);
  const [produk, setProduk] = useState([]);

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsProfileLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await fetch('/api/profil', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data.data || null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching profile data:', err);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchProdukData = async () => {
      setIsProduksLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await fetch('http://localhost:4000/api/produk/produkPetani', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response error:", errorText);
          throw new Error('Failed to fetch products data');
        }

        const data = await response.json();
        setProduk(data); // Correctly set the produk data
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products data:', err);
      } finally {
        setIsProduksLoading(false);
      }
    };
    fetchProdukData();
  }, []);

  const handleEditClick = () => {
    navigate('/edit-profile');
  };

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-xl mb-8">
        <img
          className="w-40 h-40 rounded-full border-4 border-green-400 mb-6 object-cover"
          src={`http://localhost:4000${profileData?.gambar || assets.upload_area}`}
          onError={(e) => { e.target.src = assets.upload_area; }}
          alt="Profile"
        />
        <div className="flex-1 md:ml-6 text-center md:text-left">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{profileData?.nama || '-'}</h2>
            <button
              onClick={handleEditClick}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              <FaPen className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-start pb-4">
            <p className="text-sm text-gray-500 w-1/3">Lokasi</p>
            <p className="text-sm text-gray-800 font-medium break-words w-2/3">{profileData?.lokasi || '-'}</p>
          </div>
          <div className="flex justify-between items-start pb-4">
            <p className="text-sm text-gray-500 w-1/3">Metode Pertanian</p>
            <p className="text-sm text-gray-800 font-medium break-words w-2/3">{profileData?.metode_pertanian || '-'}</p>
          </div>
          <div className="flex justify-between items-start pb-4">
            <p className="text-sm text-gray-500 w-1/3">Produk Ditawarkan</p>
            <p className="text-sm text-gray-800 font-medium break-words w-2/3">{profileData?.produk_ditawarkan || '-'}</p>
          </div>
        </div>
      </div>

      {/*  Section */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">HASIL PANEN</h3>
        <div className="text-center m-6">
          <button className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full text-3xl font-semibold hover:bg-gray-300 focus:outline-none transition">
            +
          </button>
        </div>
        {isProduksLoading ? (
          <p className="text-center text-gray-500">Loading crops...</p>
        ) : produk.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produk.map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={`http://localhost:4000${item.gambar || '/default-image.jpg'}`}  // Ensure the image path is properly handled
                  alt={item.nama || 'Produk'}
                  className="w-full h-56 object-cover"
                  onError={(e) => { e.target.src = assets.placeholder; }}  // Fallback to placeholder if image fails
                />


                <div className="p-4">
                  <h4 className="text-lg font-semibold">{item.nama || 'Hasil Panen'}</h4>
                  <p className="text-gray-600">{item.deskripsi || 'Deskripsi tidak tersedia.'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada hasil panen yang tersedia.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
