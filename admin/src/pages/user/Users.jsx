import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Menggunakan react-toastify untuk notifikasi

const Users = () => {
  // Contoh data pengguna (ini bisa diganti dengan data dari API)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', role: 'user', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@gmail.com', role: 'user', status: 'inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alicej@gmail.com', role: 'user', status: 'active' },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // Modal konfirmasi status
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToToggleStatus, setUserIdToToggleStatus] = useState(null); // ID pengguna untuk perubahan status
  const dropdownRefs = useRef({});
  const navigate = useNavigate();

  // Navigasi ke halaman detail
  const handleDetail = (id) => {
    navigate(`/users/detail/${id}`);
  };

  // Navigasi ke halaman edit
  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  // Fungsi untuk mengonfirmasi penghapusan
  const handleDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true); // Tampilkan modal konfirmasi
  };

  // Fungsi untuk menghapus pengguna setelah konfirmasi
  const handleDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== userIdToDelete);
    setUsers(updatedUsers);
    toast.success('Pengguna berhasil dihapus');
    setIsDeleteModalOpen(false); // Menutup modal setelah menghapus
  };

  // Fungsi untuk membatalkan penghapusan
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false); // Menutup modal tanpa menghapus
  };

  // Fungsi untuk mengonfirmasi perubahan status
  const handleStatusChangeConfirmation = (id) => {
    setUserIdToToggleStatus(id);
    setIsStatusModalOpen(true); // Tampilkan modal konfirmasi status
  };

  // Fungsi untuk mengubah status pengguna setelah konfirmasi
  const handleStatusChange = () => {
    const updatedUsers = users.map((user) =>
      user.id === userIdToToggleStatus ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    );
    setUsers(updatedUsers);
    toast.info(`Status pengguna berhasil diperbarui`);
    setIsStatusModalOpen(false); // Menutup modal setelah perubahan status
  };

  // Fungsi untuk membatalkan perubahan status
  const handleCancelStatusChange = () => {
    setIsStatusModalOpen(false); // Menutup modal tanpa mengubah status
  };

  const handleDropdownToggle = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleClickOutside = (event) => {
    const isClickInside = Object.values(dropdownRefs.current).some((ref) =>
      ref && ref.contains(event.target)
    );
    if (!isClickInside) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 bg-softCream bg-white">
      <h1 className="text-2xl font-medium text-gray-800 mb-2 text-center pb-10">Manajemen Pengguna</h1>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4"
        onClick={() => navigate('/users/tambah')}
      >
        Tambah Pengguna
      </button>

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
                  className={`px-4 py-2 rounded-full ${user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                >
                  {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
              </td>
              <td className="px-6 py-3 relative">
                <div
                  className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[user.id] = el)}
                >
                  <button
                    onClick={() => handleDropdownToggle(user.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Aksi
                  </button>
                  {openDropdownId === user.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                      <button
                        onClick={() => handleDetail(user.id)}
                        className="block w-full text-left px-6 py-3 text-gray-800 hover:bg-gray-100"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="block w-full text-left px-6 py-3 text-yellow-600 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(user.id)} // Menampilkan konfirmasi sebelum hapus
                        className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-100"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => handleStatusChangeConfirmation(user.id)} // Menampilkan konfirmasi sebelum perubahan status
                        className={`block w-full text-left px-6 py-3 ${user.status === 'active' ? 'text-blue-600 hover:bg-blue-100' : 'text-green-600 hover:bg-green-100'
                          }`}
                      >
                        {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Perhatian</h3>
            <p className="mb-4 text-gray-600">Apakah Anda yakin ingin menghapus pengguna ini?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Ya, Hapus
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Perubahan Status */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Perhatian</h3>
            <p className="mb-4 text-gray-600">
              Apakah Anda yakin ingin mengubah status pengguna ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStatusChange}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Ya, Ubah Status
              </button>
              <button
                onClick={handleCancelStatusChange}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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

export default Users;
