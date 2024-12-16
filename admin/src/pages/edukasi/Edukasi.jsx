import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdError, MdAdd, MdMoreVert, MdVisibility, MdEdit, MdDelete, MdSearch } from 'react-icons/md';

const Edukasi = () => {
  const [edukasiList, setEdukasiList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [edukasiIdToDelete, setEdukasiIdToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRefs = useRef({});
  const navigate = useNavigate();

  const fetchEdukasi = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/edukasi");
      const data = await response.json();
      if (response.ok) {
        setEdukasiList(data);
      } else {
        toast.error(`Failed to load edukasi data: ${data.message}`);
      }
    } catch (error) {
      console.error('Error loading edukasi data:', error);
    }
  };

  useEffect(() => {
    fetchEdukasi();
  }, []);

  const handleClickOutside = (event) => {
    const isClickInside = Object.values(dropdownRefs.current).some((ref) =>
      ref && ref.contains(event.target)
    );
    if (!isClickInside) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openDropdownId]);

  const totalPages = Math.ceil(edukasiList.length / itemsPerPage);
  const filteredEdukasiList = edukasiList.filter((edukasi) =>
    edukasi.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    edukasi.diterbitkan_pada.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentItems = filteredEdukasiList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTambah = () => navigate("/edukasi/tambah");

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token tidak ditemukan');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/edukasi/${edukasiIdToDelete}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Edukasi deleted successfully");
        setEdukasiList(edukasiList.filter((edukasi) => edukasi.id !== edukasiIdToDelete));
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete edukasi: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("Error deleting edukasi");
      console.error('Error:', error);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDetail = (id) => navigate(`/edukasi/detail/${id}`);
  const handleEdit = (id) => navigate(`/edukasi/edit/${id}`);

  const handleDeleteConfirmation = (id) => {
    setEdukasiIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDropdownToggle = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manajemen Edukasi</h1>
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm"
            onClick={handleTambah}
          >
            <MdAdd className="text-xl" />
            <span>Tambah Edukasi</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Cari edukasi..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Terbit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((edukasi, index) => (
                  <tr key={edukasi.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{edukasi.judul}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {new Date(edukasi.diterbitkan_pada).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="relative" ref={(el) => (dropdownRefs.current[edukasi.id] = el)}>
                        <button onClick={() => handleDropdownToggle(edukasi.id)} className="text-gray-400 hover:text-gray-600">
                          <MdMoreVert className="text-xl" />
                        </button>
                        {openDropdownId === edukasi.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <div className="py-1">
                              <button onClick={() => handleDetail(edukasi.id)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                                <MdVisibility className="mr-3 text-gray-400" /> Detail
                              </button>
                              <button onClick={() => handleEdit(edukasi.id)} className="flex items-center px-4 py-2 text-sm text-yellow-400 hover:bg-gray-100 w-full">
                                <MdEdit className="mr-3 text-yellow-400" /> Edit
                              </button>
                              <button onClick={() => handleDeleteConfirmation(edukasi.id)} className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-100 w-full">
                                <MdDelete className="mr-3 text-red-400" /> Hapus
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
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada edukasi ditemukan</td>
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

export default Edukasi;
