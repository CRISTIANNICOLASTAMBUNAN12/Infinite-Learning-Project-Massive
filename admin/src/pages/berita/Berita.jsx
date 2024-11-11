import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';

const Berita = () => {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState([
    {
      id: 1,
      title: 'Peningkatan Produksi Tanaman Padi',
      date: '2024-11-01',
      status: 'published',
      imageUrl: 'https://via.placeholder.com/800x400',
    },
    {
      id: 2,
      title: 'Mengenal Teknologi Pertanian Modern',
      date: '2024-10-15',
      status: 'draft',
      imageUrl: 'https://via.placeholder.com/800x400',
    },
    {
      id: 3,
      title: 'Strategi Pengendalian Hama Tanaman',
      date: '2024-09-25',
      status: 'published',
      imageUrl: 'https://via.placeholder.com/800x400',
    },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToToggleStatus, setUserIdToToggleStatus] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  const handleTambah = () => {
    navigate('/berita/tambah');
  };

  const handleDetail = (id) => {
    navigate(`/berita/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/berita/edit/${id}`);
  };

  const handleDelete = (id) => {
    const updatedBeritaList = beritaList.filter((berita) => berita.id !== id);
    setBeritaList(updatedBeritaList);
    setIsDeleteModalOpen(false);
    console.log('Berita dengan ID', id, 'telah dihapus');
  };

  const handleDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleStatusChangeConfirmation = (id) => {
    setUserIdToToggleStatus(id);
    setIsStatusModalOpen(true);
  };

  const handleCancelStatusChange = () => {
    setIsStatusModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    const updatedBeritaList = beritaList.map((berita) =>
      berita.id === id
        ? { ...berita, status: berita.status === 'published' ? 'draft' : 'published' }
        : berita
    );
    setBeritaList(updatedBeritaList);
    setIsStatusModalOpen(false);
    console.log('Status berita dengan ID', id, 'telah diubah');
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
    <div className="p-6 bg-softCream bg-white h-full w-full">
      <h1 className="text-2xl font-medium text-gray-800 mb-2 text-center pb-10">Manajemen Berita</h1>

      <button
        onClick={handleTambah}
        className="bg-green-600 text-white px-6 py-3 rounded-xl mb-6"
      >
        Tambah Berita
      </button>

      <div className="space-y-6">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Gambar</th>
              <th className="px-6 py-3">Judul</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {beritaList.map((berita) => (
              <tr key={berita.id} className="border-b">
                <td className="px-6 py-3">
                  <img
                    src={berita.imageUrl}
                    alt={berita.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-3">{berita.title}</td>
                <td className="px-6 py-3">{berita.date}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-4 py-2 rounded-full ${berita.status === 'published' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                      }`}
                  >
                    {berita.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-3 relative">
                  <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[berita.id] = el)}>
                    <button
                      onClick={() => handleDropdownToggle(berita.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Aksi
                    </button>
                    {openDropdownId === berita.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleDetail(berita.id)}
                          className="block w-full text-left px-6 py-3 text-gray-800 hover:bg-gray-100"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(berita.id)}
                          className="block w-full text-left px-6 py-3 text-yellow-600 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteConfirmation(berita.id)}
                          className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-100"
                        >
                          Hapus
                        </button>
                        <button
                          onClick={() => handleStatusChangeConfirmation(berita.id)}
                          className={`block w-full text-left px-6 py-3 ${berita.status === 'published' ? 'text-blue-600 hover:bg-blue-100' : 'text-green-600 hover:bg-green-100'}`}
                        >
                          {berita.status === 'published' ? 'Set Draft' : 'Publish'}
                        </button>
                      </div>
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
              <h3 className="text-xl font-semibold text-gray-700">
                Perhatian
              </h3>
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

      {/* Modal Konfirmasi Perubahan Status */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-96 text-center transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <MdError className="text-red-500 mr-3 text-2xl" />
              <h3 className="text-xl font-semibold text-gray-700">
                Perhatian
              </h3>
            </div>
            <p className="mb-4 text-gray-600">Apakah Anda yakin ingin mengubah status berita ini?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleToggleStatus(userIdToToggleStatus)}
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

export default Berita;
