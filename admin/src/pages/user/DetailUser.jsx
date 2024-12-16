import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Anda perlu login terlebih dahulu');
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:4000/api/pengguna/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data pengguna');
        }

        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        } else {
          toast.error('Pengguna tidak ditemukan');
          navigate('/users');
        }
      } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil data pengguna');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const handleBack = () => {
    navigate('/users');
  };

  const handleTambah = () => {
    navigate('/users/tambah');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Pengguna tidak ditemukan
      </div>
    );
  }

  const InfoItem = ({ label, value }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">{label}</p>
      <p className="text-lg text-gray-800 font-medium break-words">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Detail Pengguna</h1>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Informasi lengkap mengenai pengguna ini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Nama" value={user.nama} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Pengalaman" value={user.pengalaman} />
            <InfoItem label="Tentang" value={user.tentang} />
            <InfoItem label="Alamat" value={user.alamat} />
            <InfoItem label="Jenis Kelamin" value={user.jenis_kelamin} />
            <InfoItem label="Pekerjaan" value={user.pekerjaan} />
            <InfoItem label="No.Telepon" value={user.no_hp} />
            <InfoItem 
              label="Peran" 
              value={
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {user.peran}
                </span>
              }
            />
            <InfoItem 
              label="Akun dibuat pada" 
              value={new Date(user.dibuat_pada).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleBack}
            className="flex-1 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            ← Kembali
          </button>
          <button
            onClick={handleTambah}
            className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            + Tambah Pengguna
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;