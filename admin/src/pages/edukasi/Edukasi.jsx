import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';

const Edukasi = () => {
  const navigate = useNavigate();
  const dropdownRefs = useRef({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToToggleStatus, setUserIdToToggleStatus] = useState(null);

  const [edukasiList, setEdukasiList] = useState([
    {
      id: 1,
      title: 'Teknik Pertanian Organik yang Efektif',
      date: '2024-11-05',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Pelajari cara bertani organik yang efektif untuk meningkatkan hasil panen tanpa merusak lingkungan.',
      status: 'published',
    },
    {
      id: 2,
      title: 'Inovasi Teknologi dalam Pertanian',
      date: '2024-10-25',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Temukan inovasi terbaru dalam teknologi pertanian yang dapat membantu petani meningkatkan efisiensi.',
      status: 'draft',
    },
    {
      id: 3,
      title: 'Cara Mengatasi Penyakit Tanaman dengan Ramuan Alami',
      date: '2024-09-20',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Pelajari bagaimana cara alami untuk mengatasi hama dan penyakit pada tanaman secara ramah lingkungan.',
      status: 'published',
    },
  ]);

  const handleTambah = () => {
    navigate(`/edukasi/tambah`);
  };

  const handleDetail = (id) => {
    navigate(`/edukasi/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edukasi/edit/${id}`);
  };

  const handleDelete = (id) => {
    const updatedEdukasiList = edukasiList.filter((edukasi) => edukasi.id !== id);
    setEdukasiList(updatedEdukasiList);
    setIsDeleteModalOpen(false);
    console.log('edukasi dengan ID', id, 'telah dihapus');
  };

  const handleDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    const updatedEdukasiList = edukasiList.map((edukasi) =>
      edukasi.id === id
        ? { ...edukasi, status: edukasi.status === 'published' ? 'draft' : 'published' }
        : edukasi
    );
    setEdukasiList(updatedEdukasiList);
    setIsStatusModalOpen(false);
    console.log('Status edukasi dengan ID', id, 'telah diubah');
  };

  const handleStatusChangeConfirmation = (id) => {
    setUserIdToToggleStatus(id);
    setIsStatusModalOpen(true);
  };

  const handleCancelStatusChange = () => {
    setIsStatusModalOpen(false);
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
      <h1 className="text-2xl font-medium text-gray-800 mb-2 text-center pb-10">Manajemen edukasi Edukasi</h1>

      <button
        onClick={handleTambah}
        className="bg-green-600 text-white px-6 py-3 rounded-xl mb-6"
      >
        Tambah edukasi Edukasi
      </button>

      <div className="space-y-6">
        {edukasiList.map((edukasi) => (
          <div key={edukasi.id} className="flex bg-white border">
            <img
              src={edukasi.imageUrl}
              alt={edukasi.title}
              className="w-48 h-48 object-cover rounded-l-xl"
            />
            <div className="p-6 flex-1">
              <h3 className="text-1xl font-medium text-gray-800 mb-2">{edukasi.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{edukasi.date}</p>
              <p className="text-gray-700 mb-4">{edukasi.description}</p>
              <span
                className={`px-4 py-2 rounded-full ${edukasi.status === 'published' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                  }`}
              >
                {edukasi.status === 'published' ? 'Dipublikasikan' : 'Draft'}
              </span>
            </div>
            <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[edukasi.id] = el)}>
              <button
                onClick={() => handleDropdownToggle(edukasi.id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg"
              >
                Aksi
              </button>
              {openDropdownId === edukasi.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                  <button
                    onClick={() => handleDetail(edukasi.id)}
                    className="block w-full text-left px-6 py-3 text-gray-800 hover:bg-gray-100"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleEdit(edukasi.id)}
                    className="block w-full text-left px-6 py-3 text-yellow-600 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(edukasi.id)}
                    className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-100"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => handleStatusChangeConfirmation(edukasi.id)}
                    className={`block w-full text-left px-6 py-3 ${edukasi.status === 'published' ? 'text-blue-600 hover:bg-blue-100' : 'text-green-600 hover:bg-green-100'}`}
                  >
                    {edukasi.status === 'published' ? 'Set Draft' : 'Publish'}
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
            <p className="mb-4 text-gray-600">Apakah Anda yakin ingin mengubah status edukasi ini?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleToggleStatus(userIdToToggleStatus)}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Ya, Ubah
              </button>
              <button
                onClick={handleCancelStatusChange}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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
