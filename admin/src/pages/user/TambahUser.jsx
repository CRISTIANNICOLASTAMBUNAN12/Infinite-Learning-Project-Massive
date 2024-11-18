import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const TambahUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '', // Menambahkan kolom pengalaman
    about: '', // Menambahkan kolom tentang
    address: '', // Menambahkan kolom alamat
    gender: '', // Menambahkan kolom jenis kelamin
    job: '', // Menambahkan kolom pekerjaan
    phone: '', // Menambahkan kolom nomor HP
    password: '', // Menambahkan password untuk registrasi
    role: 'petani', // Menggunakan 'petani' sesuai pilihan Anda
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: formData.name,
          email: formData.email,
          pengalaman: formData.experience, // Menyertakan pengalaman
          tentang: formData.about, // Menyertakan tentang
          alamat: formData.address, // Menyertakan alamat
          jenis_kelamin: formData.gender, // Menyertakan jenis kelamin
          pekerjaan: formData.job, // Menyertakan pekerjaan
          no_hp: formData.phone, // Menyertakan no_hp
          kata_sandi: formData.password,  // Menyertakan password
          peran: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Pengguna berhasil ditambahkan');
        navigate('/users'); // Redirect ke halaman daftar pengguna
      } else {
        toast.error(data.message || 'Gagal menambahkan pengguna');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menambahkan pengguna');
      console.error('Error adding user:', error);  // Menampilkan kesalahan di konsol
    }
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
          <label className="block text-gray-700 font-medium mb-2">Pengalaman</label>
          <textarea
            name="experience"
            placeholder="Masukkan pengalaman"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Tentang</label>
          <textarea
            name="about"
            placeholder="Masukkan tentang diri Anda"
            value={formData.about}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Alamat</label>
          <textarea
            name="address"
            placeholder="Masukkan alamat"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Jenis Kelamin</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-700"
          >
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Pekerjaan</label>
          <input
            type="text"
            name="job"
            placeholder="Masukkan pekerjaan"
            value={formData.job}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">No. HP</label>
          <input
            type="text"
            name="phone"
            placeholder="Masukkan nomor handphone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            value={formData.password}
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
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-700"
          >
            <option value="petani">Petani</option>
            {/* Tambahkan opsi lain jika diperlukan */}
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
