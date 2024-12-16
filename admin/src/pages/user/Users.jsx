import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdError, MdAdd, MdMoreVert, MdVisibility, MdEdit, MdDelete, MdSearch } from 'react-icons/md';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dropdownRefs = useRef({});
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Existing fetch users function
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

  // Existing handlers
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

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.peran.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manajemen Pengguna</h1>
          <button
            onClick={() => navigate('/users/tambah')}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm"
          >
            <MdAdd className="text-xl" />
            <span>Tambah Pengguna</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-80 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.nama}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.peran}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="relative" ref={(el) => (dropdownRefs.current[user.id] = el)}>
                        <button
                          onClick={() => handleDropdownToggle(user.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MdMoreVert className="text-xl" />
                        </button>
                        {openDropdownId === user.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <div className="py-1">
                              <button
                                onClick={() => handleDetail(user.id)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                              >
                                <MdVisibility className="mr-3 text-gray-400" />
                                Detail
                              </button>
                              <button
                                onClick={() => handleEdit(user.id)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                              >
                                <MdEdit className="mr-3 text-yellow-400" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteConfirmation(user.id)}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                              >
                                <MdDelete className="mr-3 text-red-400" />
                                Hapus
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data pengguna.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Halaman {currentPage} dari {totalPages}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 transform transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <MdError className="text-red-600 text-xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-500 text-center mb-6">
              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;