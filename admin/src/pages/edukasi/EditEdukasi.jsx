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
    <div className="p-6 bg-white h-full w-full">
      <div className="p-10">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-medium text-gray-800">Edit Edukasi</h1>
        </div>

        {/* Image Preview */}
        <div className="items-center pb-10">
          {(previewImage || edukasi.imageUrl) && (
            <div className="mb-10 relative">
              <img
                src={previewImage || edukasi.imageUrl}
                alt="Preview Gambar Edukasi"
                className="object-cover h-auto max-h-96 max-w-96 rounded-md shadow-md mx-auto"
              />
            </div>
          )}

          {/* Button to Remove Image */}
          {previewImage && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-4 text-red-500 hover:text-red-700 font-semibold rounded-lg flex items-center gap-2"
              >
                <FaTimesCircle size={20} />
                Hapus Perubahan
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Judul Edukasi
            </label>
            <input
              type="text"
              id="title"
              value={edukasi.title}
              onChange={(e) => setEdukasi({ ...edukasi, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Konten Edukasi
            </label>
            <textarea
              id="content"
              value={edukasi.content}
              onChange={(e) => setEdukasi({ ...edukasi, content: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
              rows="5"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label htmlFor="kategori_id" className="block text-gray-700 font-medium mb-2">
              Kategori Edukasi
            </label>
            <select
              id="kategori_id"
              value={edukasi.kategori_id}
              onChange={(e) => setEdukasi({ ...edukasi, kategori_id: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
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
            <label htmlFor="gambar" className="block text-gray-700 font-medium mb-2">
              Gambar Edukasi
            </label>
            <div className="relative">
              <input
                type="file"
                id="gambar"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-10 pt-10">
            <button
              type="button"
              onClick={() => navigate('/edukasi')}
              className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Kembali
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
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
