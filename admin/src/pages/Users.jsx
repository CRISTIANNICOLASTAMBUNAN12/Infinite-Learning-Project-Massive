import React, { useState } from 'react';

const Users = () => {
  // Contoh data pengguna (ini bisa diganti dengan data dari API)
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', role: 'user', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@gmail.com', role: 'user', status: 'inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alicej@gmail.com', role: 'user', status: 'active' },
  ];

  const handleEdit = (id) => {
    // Fungsi untuk mengedit pengguna
    console.log('Edit user with ID:', id);
  };

  const handleDelete = (id) => {
    // Fungsi untuk menghapus pengguna
    console.log('Delete user with ID:', id);
  };

  const handleToggleStatus = (id) => {
    // Fungsi untuk mengubah status pengguna
    console.log('Toggle status for user with ID:', id);
  };

  return (
    <div className="p-6 min-h-screen bg-softCream">
      <h1 className="text-3xl font-bold mb-6">Manajemen Pengguna</h1>

      {/* Tombol untuk menambah pengguna baru */}
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4">Tambah Pengguna</button>

      {/* Tabel Daftar Pengguna */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Peran</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-4 py-2 rounded-full ${
                      user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
