import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const EditBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState({ title: '', content: '', gambar: '' });
  const [file, setFile] = useState(null); // Menyimpan file yang diunggah
  const [previewImage, setPreviewImage] = useState(null); // Untuk preview gambar baru

  // Mengambil data berita berdasarkan ID untuk diedit
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/berita/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBerita({
            title: data.judul,
            content: data.konten,
            gambar: data.gambar && !data.gambar.startsWith('http')
              ? `http://localhost:4000${data.gambar}`
              : data.gambar || '',
          });
        } else {
          console.error('Berita tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching berita:', error);
      }
    };

    fetchBerita();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', berita.title);
    formData.append('konten', berita.content);
    if (file) formData.append('gambar', file);

    try {
      const response = await fetch(`http://localhost:4000/api/berita/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        navigate('/berita'); // Kembali ke halaman daftar berita
      } else {
        console.error('Gagal menyimpan perubahan berita');
      }
    } catch (error) {
      console.error('Error updating berita:', error);
    }
  };

  const handleBack = () => {
    navigate('/berita');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Untuk preview gambar baru
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewImage(fileURL);
    }
  };

  const handleRemoveImage = () => {
    setFile(null); // Reset file baru
    setPreviewImage(null); // Reset preview gambar baru
    document.getElementById('gambar').value = null; // Reset input file
  };

  return (
    <div className="p-6 bg-white h-full w-full">
      <div className="p-10">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-medium text-gray-800">Edit Berita</h1>
        </div>

        <div className="items-center pb-10">
          {(previewImage || berita.gambar) && (
            <div className="mb-10 relative">
              <img
                src={previewImage || berita.gambar}
                alt="Preview Gambar Berita"
                className="object-cover h-auto max-h-96 max-w-96 rounded-md shadow-md mx-auto"
              />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Judul Berita
            </label>
            <input
              type="text"
              id="title"
              value={berita.title}
              onChange={(e) => setBerita({ ...berita, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Konten
            </label>
            <textarea
              id="content"
              value={berita.content}
              onChange={(e) => setBerita({ ...berita, content: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="gambar" className="block text-gray-700 font-medium mb-2">
              Gambar Berita
            </label>
            <div className="relative">
              <input
                type="file"
                id="gambar"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow placeholder-gray-400"
                onChange={handleFileChange}
                accept="image/*"
              />
              {previewImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 m-4 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <FaTimesCircle size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-10 pt-10">
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Kembali
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBerita;
