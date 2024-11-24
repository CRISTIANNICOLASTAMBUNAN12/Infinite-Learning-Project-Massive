import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import { toast } from 'react-toastify';

const Berita = () => {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/berita');
        const data = await response.json();
        if (response.ok) {
          setBeritaList(data);
        } else {
          console.error('Gagal mengambil data berita:', data.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data berita:', error);
      }
    };
    fetchBerita();
  }, []);

  const handleTambah = () => {
    navigate('/berita/tambah');
  };

  const handleDetail = (id) => {
    navigate(`/berita/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/berita/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/berita/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedBeritaList = beritaList.filter((berita) => berita.id !== id);
        setBeritaList(updatedBeritaList);
        setIsDeleteModalOpen(false);
        toast.success('Berita berhasil dihapus');
      } else {
        const result = await response.json();
        toast.error(result.message || 'Gagal menghapus berita');
      }
    } catch (error) {
      console.error('Error deleting berita:', error);
      toast.error('Terjadi kesalahan saat menghapus berita');
    }
  };

  const handleDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
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

  const totalPages = Math.ceil(beritaList.length / itemsPerPage);
  const currentItems = beritaList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white w-full h-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Manajemen Berita</h1>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4 hover:bg-green-700 transition-colors duration-300"
        onClick={handleTambah}
      >
        Tambah Berita
      </button>
      <div className="overflow-x-auto md:overflow-visible">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Judul</th>
              <th className="px-6 py-3 text-left">Tanggal Terbit</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((berita, index) => (
                <tr key={berita.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-6 py-4">{berita.judul}</td>
                  <td className="px-6 py-4">
                    {new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="relative inline-block text-left cursor-pointer"
                      ref={(el) => (dropdownRefs.current[berita.id] = el)}
                    >
                      <button
                        onClick={() => handleDropdownToggle(berita.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                      >
                        Aksi
                      </button>
                      {openDropdownId === berita.id && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                          <li
                            onClick={() => handleDetail(berita.id)}
                            className="block w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                          >
                            Detail
                          </li>
                          <li
                            onClick={() => handleEdit(berita.id)}
                            className="block w-full px-4 py-2 text-sm text-yellow-500 hover:bg-gray-100"
                          >
                            Edit
                          </li>
                          <li
                            onClick={() => handleDeleteConfirmation(berita.id)}
                            className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                          >
                            Hapus
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data berita.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render pagination only if more than 10 users */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <MdError className="text-red-500 mr-3 text-2xl" />
              <h3 className="text-xl font-semibold text-gray-700">Perhatian</h3>
            </div>
            <p className="mb-4 text-gray-600">Apakah Anda yakin ingin menghapus berita ini?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(userIdToDelete)}
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
    </div>
  );
};

export default Berita;
