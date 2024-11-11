import React from 'react';
import { FaUsers, FaBoxOpen, FaBook, FaChartLine } from 'react-icons/fa';
import { MdForum } from 'react-icons/md';

const Dashboard = () => {
  return (
    <div className="p-6 bg-white border h-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      
      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-4xl text-green-600 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Pengguna Terdaftar</h2>
            <p className="text-xl font-bold">1,200</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaBoxOpen className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Produk Terdaftar</h2>
            <p className="text-xl font-bold">300</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaBook className="text-4xl text-blue-600 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Artikel Terbit</h2>
            <p className="text-xl font-bold">50</p>
          </div>
        </div>
      </div>

      {/* Tabel Pengguna / Transaksi */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Pengguna Terbaru</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">johndoe@example.com</td>
              <td className="py-2 px-4">Aktif</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">janesmith@example.com</td>
              <td className="py-2 px-4">Nonaktif</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button className="bg-green-600 text-white p-4 rounded-lg shadow-md flex items-center justify-center">
          <FaUsers className="mr-3" /> Tambah Pengguna Baru
        </button>
        <button className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center">
          <FaBook className="mr-3" /> Tambah Artikel Baru
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Aktivitas Terbaru</h2>
        <ul>
          <li className="border-b py-2">John Doe mendaftar sebagai pengguna baru</li>
          <li className="border-b py-2">Artikel "Cara Bertani Organik" diterbitkan</li>
          <li className="border-b py-2">Diskusi tentang pertanian berkelanjutan dimulai di forum</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
