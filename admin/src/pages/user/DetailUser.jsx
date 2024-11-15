import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data (nanti bisa diambil dari API atau state)
  const user = {
    id,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'user',
    status: 'active',
  };

  // Fungsi untuk tombol kembali
  const handleBack = () => {
    navigate('/users'); // Redirect ke halaman daftar pengguna
  };

  const handleTambah = (id) => {
    navigate(`/users/tambah`);
  };

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
            <p className="text-lg text-gray-800 font-medium">{user.name}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Email</p>
            <p className="text-lg text-gray-800 font-medium">{user.email}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Peran</p>
            <p className="text-lg text-gray-800 font-medium">{user.role}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-lg font-semibold text-gray-600">Status</p>
            <span
              className={`px-4 py-2 rounded-full font-medium ${user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
            </span>
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
            onClick={handleTambah} type="submit"
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
