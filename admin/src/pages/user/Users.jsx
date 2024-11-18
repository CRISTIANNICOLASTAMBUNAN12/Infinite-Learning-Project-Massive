import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdError } from 'react-icons/md';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  // Ambil data pengguna dari backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Periksa apakah token ada
      if (!token) {
        toast.error('Token tidak ditemukan');
        return;
      }

      const response = await fetch('http://localhost:4000/api/pengguna', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error('Gagal memuat data pengguna');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memuat data pengguna');
      console.error('Error fetching users:', error);  // Menampilkan kesalahan di konsol
    }
  };

  useEffect(() => {
    fetchUsers(); // Ambil data saat komponen dimuat
  }, []);

  // Fungsi untuk mengonfirmasi penghapusan pengguna
  const handleDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // Fungsi untuk menampilkan detail pengguna
  const handleDetail = (id) => {
    navigate(`/users/detail/${id}`);
  };

  // Fungsi untuk mengedit pengguna
  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  // Fungsi untuk menghapus pengguna
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token tidak ditemukan');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/pengguna/${userIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Gagal menghapus pengguna: ${errorData.message || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Pengguna berhasil dihapus');
        setUsers(users.filter((user) => user.id !== userIdToDelete)); // Update UI setelah penghapusan
      } else {
        toast.error('Gagal menghapus pengguna');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus pengguna');
      console.error('Error deleting user:', error);  // Menampilkan kesalahan di konsol
    }
    setIsDeleteModalOpen(false);
  };

  // Fungsi untuk menangani dropdown
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
    <div className="p-6">
      <h1 className="text-2xl font-medium text-gray-800 mb-2 text-center">Manajemen Pengguna</h1>
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
            <th className="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-6 py-3">{user.nama}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.peran}</td>
              <td className="px-6 py-3">
                <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[user.id] = el)}>
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
                        onClick={() => handleDeleteConfirmation(user.id)}
                        className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-100"
                      >
                        Hapus
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
        <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-center mb-4">
            <MdError className="text-red-500 mr-3 text-2xl" />
            <h3 className="text-xl font-semibold text-gray-700">
              Perhatian
            </h3>
          </div>
          <p className="mb-4 text-gray-600">Apakah Anda yakin ingin menghapus pengguna ini?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDelete} className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Ya, Hapus
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
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
