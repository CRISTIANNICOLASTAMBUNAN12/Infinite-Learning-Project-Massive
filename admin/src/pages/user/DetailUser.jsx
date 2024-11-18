import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailUser = () => {
  const { id } = useParams();  // Mendapatkan ID pengguna dari URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  // State untuk menyimpan data pengguna
  const [loading, setLoading] = useState(true);  // State untuk loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Anda perlu login terlebih dahulu');
          navigate('/login');  // Redirect ke login jika token tidak ada
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
          setUser(data.data);  // Menyimpan data pengguna dalam state
        } else {
          toast.error('Pengguna tidak ditemukan');
          navigate('/users');
        }
      } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil data pengguna');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);  // Mengubah status loading setelah data diambil
      }
    };

    fetchUserData();
  }, [id, navigate]);  // Dependensi id dan navigate untuk menjalankan ulang efek

  // Fungsi untuk tombol kembali
  const handleBack = () => {
    navigate('/users');  // Redirect ke halaman daftar pengguna
  };

  // Fungsi untuk tombol tambah pengguna
  const handleTambah = () => {
    navigate('/users/tambah');  // Redirect ke halaman tambah pengguna
  };

  if (loading) {
    return <div>Loading...</div>;  // Menampilkan loading jika data belum selesai diambil
  }

  if (!user) {
    return <div>Pengguna tidak ditemukan</div>;  // Menampilkan pesan jika pengguna tidak ditemukan
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
            <p className="text-lg font-semibold text-gray-600">Peran</p>
            <p className="text-lg text-gray-800 font-medium">{user.peran}</p>
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
