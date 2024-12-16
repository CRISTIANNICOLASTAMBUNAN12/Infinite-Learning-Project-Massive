import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditEdukasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edukasi, setEdukasi] = useState({
    title: '',
    content: '',
    imageUrl: '',
    kategori_id: ''
  });
  const [kategoriList, setKategoriList] = useState([]);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data edukasi untuk mendapatkan gambar lama
  useEffect(() => {
    const fetchEdukasi = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/edukasi/${id}`);
        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.gambar ? `http://localhost:4000${data.gambar}` : '';
          setEdukasi({
            title: data.judul,
            content: data.konten,
            imageUrl,
            kategori_id: data.kategori_id, // Include kategori_id from the fetched data
          });
        } else {
          toast.error('Data edukasi tidak ditemukan');
        }
      } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil data edukasi');
        console.error(error);
      }
    };

    fetchEdukasi();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/kategori');
        if (response.ok) {
          const data = await response.json();
          setKategoriList(data); // Populate kategori list
        } else {
          toast.error('Gagal mengambil kategori');
        }
      } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil kategori');
        console.error(error);
      }
    };

    fetchKategori();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('judul', edukasi.title);
    formData.append('konten', edukasi.content);
    formData.append('kategori_id', edukasi.kategori_id); // Include kategori_id in the FormData

    // If a new file is selected, append it to the formData
    if (file) {
      formData.append('gambar', file);
    } else {
      // If no file selected, keep the old image
      formData.append('gambar', edukasi.imageUrl); // Add the old image URL if no new image
    }

    try {
      const response = await fetch(`http://localhost:4000/api/edukasi/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        toast.success('Edukasi berhasil diperbarui!');
        navigate('/edukasi');
      } else {
        toast.error('Gagal memperbarui edukasi');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memperbarui edukasi');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file change (image)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Validate file size (max 2MB)
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file tidak boleh lebih dari 2MB');
        return;
      }
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewImage(null);
    document.getElementById('gambar').value = null; // Reset input file
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 border-b pb-4 border-gray-300">Edit Edukasi</h1>

        {/* Image Preview */}
        <div className="py-6">
          {(previewImage || edukasi.imageUrl) && (
            <div className="relative flex justify-center mb-6">
              <img
                src={previewImage || edukasi.imageUrl}
                alt="Preview Gambar Edukasi"
                className="rounded-xl shadow-md w-full max-w-md object-cover"
              />
              {previewImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 shadow-md"
                >
                  <FaTimesCircle size={24} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-3">
              Judul Edukasi
            </label>
            <input
              type="text"
              id="title"
              value={edukasi.title}
              onChange={(e) => setEdukasi({ ...edukasi, title: e.target.value })}
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400 shadow-sm"
              placeholder="Masukkan judul edukasi"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-3">
              Konten Edukasi
            </label>
            <textarea
              id="content"
              value={edukasi.content}
              onChange={(e) => setEdukasi({ ...edukasi, content: e.target.value })}
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400 shadow-sm"
              rows="6"
              placeholder="Tulis konten edukasi di sini"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label htmlFor="kategori_id" className="block text-gray-700 font-semibold mb-3">
              Kategori Edukasi
            </label>
            <select
              id="kategori_id"
              value={edukasi.kategori_id}
              onChange={(e) => setEdukasi({ ...edukasi, kategori_id: e.target.value })}
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              required
            >
              <option value="">Pilih Kategori</option>
              {kategoriList.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="gambar" className="block text-gray-700 font-semibold mb-3">
              Gambar Edukasi
            </label>
            <input
              type="file"
              id="gambar"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-6 pt-8">
            <button
              type="button"
              onClick={() => navigate('/edukasi')}
              className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105 shadow-md"
            >
              Kembali
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md"
            >
              {loading ? 'Loading...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEdukasi;
