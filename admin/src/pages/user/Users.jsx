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

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
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
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDetail = (id) => {
    navigate(`/users/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

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
        setUsers(users.filter((user) => user.id !== userIdToDelete));
      } else {
        toast.error('Gagal menghapus pengguna');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus pengguna');
      console.error('Error deleting user:', error);
    }
    setIsDeleteModalOpen(false);
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
    <div className="p-6 max-w-7xl mx-auto bg-white w-full h-full">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Manajemen Pengguna</h1>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4 hover:bg-green-700 transition-colors duration-300"
        onClick={() => navigate('/users/tambah')}
      >
        Tambah Pengguna
      </button>

      <div className="overflow-x-auto md:overflow-visible">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Peran</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.nama}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.peran}</td>
                <td className="px-6 py-4">
                  <div className="relative inline-block text-left cursor-pointer" ref={(el) => (dropdownRefs.current[user.id] = el)}>
                    <button
                      onClick={() => handleDropdownToggle(user.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Aksi
                    </button>
                    {openDropdownId === user.id && (
                      <ul
                        className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50"
                        style={{ overflow: 'visible' }}
                      >
                        <li
                          onClick={() => handleDetail(user.id)}
                          className="block w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 gap-2"
                        >
                          Detail
                        </li>
                        <li
                          onClick={() => handleEdit(user.id)}
                          className="block w-full px-4 py-2 text-sm text-yellow-500 hover:bg-gray-100 gap-2"
                        >
                          Edit
                        </li>
                        <li
                          onClick={() => handleDeleteConfirmation(user.id)}
                          className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50 gap-2"
                        >
                          Hapus
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <MdError className="text-red-500 mr-3 text-2xl" />
              <h3 className="text-xl font-semibold text-gray-700">Perhatian</h3>
            </div>
            <p className="mb-4 text-gray-600">Apakah Anda yakin ingin menghapus pengguna ini?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Ya, Hapus
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
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
