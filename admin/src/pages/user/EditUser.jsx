import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'user',
    status: 'active',
  };

  const [formData, setFormData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memeriksa apakah ada perubahan data
  const hasChanges = Object.keys(initialData).some((key) => initialData[key] !== formData[key]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan proses pengeditan pengguna (API call atau state update)
    console.log('User updated:', formData);
    toast.success('Pengguna berhasil diperbarui');
    navigate('/users');
  };

  // Fungsi untuk menampilkan modal konfirmasi
  const handleBack = () => {
    // Hanya menampilkan modal jika ada perubahan data
    if (hasChanges) {
      setIsModalOpen(true);
    } else {
      navigate('/users'); // Jika tidak ada perubahan, langsung kembali
    }
  };

  // Fungsi untuk menutup modal konfirmasi tanpa menyimpan
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fungsi untuk melanjutkan kembali tanpa menyimpan
  const handleConfirmBack = () => {
    setIsModalOpen(false);
    navigate('/users'); // Redirect ke halaman daftar pengguna
  };

  return (
    <div className="min-h-screen bg-softCream p-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
        <div className='text-center pb-4'>
          <h1 className="text-2xl font-medium text-gray-800">Tambah Pengguna</h1>
        </div>
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Pengguna"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-lg font-semibold text-gray-700">Peran</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            type="button"
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Perhatian</h3>
            <p className="mb-4 text-gray-600">Perubahan yang Anda buat belum disimpan. Apakah Anda yakin ingin kembali?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmBack}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Ya
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
