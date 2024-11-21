import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdError } from 'react-icons/md';

const Edukasi = () => {
  const [edukasiList, setEdukasiList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [edukasiIdToDelete, setEdukasiIdToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  // Fetch data edukasi dari backend
  const fetchEdukasi = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/edukasi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setEdukasiList(data);
      } else {
        toast.error(`Gagal memuat data edukasi: ${data.message}`);
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memuat data edukasi');
      console.error('Error fetching edukasi:', error);
    }
  };

  useEffect(() => {
    fetchEdukasi(); // Ambil data saat komponen dimuat
  }, []);

  // Konfirmasi penghapusan edukasi
  const handleDeleteConfirmation = (id) => {
    setEdukasiIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // Fungsi menghapus edukasi
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/edukasi/${edukasiIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Gagal menghapus edukasi: ${errorData.message}`);
        return;
      }

      toast.success('Edukasi berhasil dihapus');
      setEdukasiList(edukasiList.filter((edukasi) => edukasi.id !== edukasiIdToDelete));
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus edukasi');
      console.error('Error deleting edukasi:', error);
    }
    setIsDeleteModalOpen(false);
  };

  // Aksi lainnya
  const handleTambah = () => {
    navigate('/edukasi/tambah');
  };

  const handleDetail = (id) => {
    navigate(`/edukasi/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edukasi/edit/${id}`);
  };

  // Dropdown aksi
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
    <div className="p-6 bg-softCream bg-white h-full w-full">
      <h1 className="text-2xl font-medium text-gray-800 mb-2 text-center pb-10">Manajemen Edukasi</h1>
      <button
        onClick={handleTambah}
        className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4"
      >
        Tambah Edukasi
      </button>

      <div className="space-y-6">
        {edukasiList.map((edukasi) => (
          <div key={edukasi.id} className="flex bg-white border">
            <img
              src={`http://localhost:4000/${edukasi.gambar}`}
              alt={edukasi.judul}
              className="w-48 h-48 object-cover rounded-l-xl"
            />

            <div className="p-6 flex-1">
              <h2 className="text-1xl font-medium text-gray-800 mb-2">{edukasi.judul}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {(() => {
                  const date = new Date(edukasi.diterbitkan_pada);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = String(date.getFullYear());
                  return `${day}/${month}/${year}`;
                })()}
              </p>
              <p className="text-gray-700 mb-4">{edukasi.konten}</p>
            </div>
            <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[edukasi.id] = el)}>
              <button
                onClick={() => handleDropdownToggle(edukasi.id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Aksi
              </button>
              {openDropdownId === edukasi.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                  <button onClick={() => handleDetail(edukasi.id)} className="block w-full text-left px-6 py-3 text-gray-800 hover:bg-gray-100">
                    Detail
                  </button>
                  <button onClick={() => handleEdit(edukasi.id)} className="block w-full text-left px-6 py-3 text-yellow-600 hover:bg-gray-100">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteConfirmation(edukasi.id)} className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-100">
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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
            <p className="mb-4 text-gray-600">Apakah Anda yakin ingin menghapus edukasi ini?</p>
            <div className="flex justify-center gap-6">
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
    </div>
  );
};

export default Edukasi;
