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

  return (
    <div className="min-h-screen bg-softCream p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-xl space-y-6">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-medium text-gray-800">Informasi Pengguna</h1>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-600">Nama</p>
            <p className="text-lg text-gray-800">{user.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-600">Email</p>
            <p className="text-lg text-gray-800">{user.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-600">Peran</p>
            <p className="text-lg text-gray-800">{user.role}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-600">Status</p>
            <span
              className={`px-4 py-2 rounded-full ${user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Kembali
          </button>
          <button
            onClick={() => navigate(`/users/edit/${user.id}`)}
            className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Edit Pengguna
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
