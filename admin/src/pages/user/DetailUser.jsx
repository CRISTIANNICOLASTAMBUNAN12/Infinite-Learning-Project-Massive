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
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Pengguna tidak ditemukan</div>;
  }

  return (
    <div className="p-6 bg-softCream bg-white h-full w-full">
      <div className="p-6">
        <div className="text-center pb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Detail Pengguna</h1>
          <p className="text-gray-600">Informasi lengkap mengenai pengguna ini</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Nama</p>
            <p className="text-lg text-gray-800 font-medium">{user.nama}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Email</p>
            <p className="text-lg text-gray-800 font-medium">{user.email}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Pengalaman</p>
            <p className="text-lg text-gray-800 font-medium">{user.pengalaman}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Tentang</p>
            <p className="text-lg text-gray-800 font-medium">{user.tentang}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Alamat</p>
            <p className="text-lg text-gray-800 font-medium">{user.alamat}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Jenis Kelamin</p>
            <p className="text-lg text-gray-800 font-medium">{user.jenis_kelamin}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Pekerjaan</p>
            <p className="text-lg text-gray-800 font-medium">{user.pekerjaan}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">No.Telepon</p>
            <p className="text-lg text-gray-800 font-medium">{user.no_hp}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Peran</p>
            <p className="text-lg text-gray-800 font-medium">{user.peran}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Akun dibuat pada</p>
            <p className="text-lg text-gray-800 font-medium">{user.dibuat_pada}</p>
          </div>
        </div>

        <div className="flex justify-between gap-10 pt-10">
          <button
            onClick={handleBack}
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Kembali
          </button>
          <button
            onClick={handleTambah}
            className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Tambah Pengguna
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
