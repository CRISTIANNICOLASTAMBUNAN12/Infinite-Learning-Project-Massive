import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaTimesCircle } from 'react-icons/fa';

const TambahBerita = () => {
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: '',
  });

  const navigate = useNavigate();
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'gambar') {
      setFormData({ ...formData, [name]: files[0] });
      handleImageChange(e);
      setIsImageSelected(true);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('judul', formData.judul);
    formDataToSend.append('konten', formData.konten);
    formDataToSend.append('gambar', formData.gambar);

    try {
      const response = await fetch('http://localhost:4000/api/berita', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Berita berhasil ditambahkan');
        navigate('/berita');
      } else {
        toast.error(data.message || 'Gagal menambahkan berita');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menambahkan berita');
      console.error('Error adding news:', error);
    }
  };


  const handleBack = () => {
    navigate('/berita');
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, gambar: '' });
    setIsImageSelected(false);
    setPreviewImage(null);
    document.getElementById('gambarInput').value = null;
  };

  return (
    <div className="p-6 bg-white h-full w-full">
      <div className="text-center pb-4">
        <h1 className="text-2xl font-medium text-gray-800 p-10">Tambah Berita Baru</h1>
      </div>

      <div className="items-center pb-10">
        {previewImage && (
          <img src={previewImage} alt="Preview Gambar" className="object-cover h-auto max-h-96 max-w-96 rounded-md shadow-md mx-auto" />
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Judul Berita</label>
          <input
            type="text"
            name="judul"
            placeholder="Masukkan judul berita"
            value={formData.judul}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Konten Berita</label>
          <textarea
            name="konten"
            placeholder="Masukkan konten berita"
            value={formData.konten}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Gambar Berita</label>
          <div className="relative">
            <input
              type="file"
              name="gambar"
              id="gambarInput" 
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
            />
            {isImageSelected && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 m-4 text-red-500 hover:text-red-700 focus:outline-none"
              >
                <FaTimesCircle /> 
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-10 pt-10">
          <button
            onClick={handleBack}
            type="button"
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Simpan Berita
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahBerita;
