import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const TambahUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User added:', formData);
    toast.success('Pengguna berhasil ditambahkan');
    navigate('/users'); // Redirect ke halaman daftar pengguna
  };

  const handleBack = () => {
    navigate('/users');
  };

  return (
    <div className="p-6 bg-white h-full w-full">
      <div className='text-center pb-4'>
        <h1 className="text-2xl font-medium text-gray-800 p-10">Tambah Pengguna</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            placeholder="Masukkan nama lengkap"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Peran</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-700"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-between gap-10 pt-10">
          <button
            onClick={handleBack}
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Tambah Pengguna
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahUser;
