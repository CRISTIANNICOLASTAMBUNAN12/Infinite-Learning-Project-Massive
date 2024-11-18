import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState({ title: '', content: '', date: '', status: 'draft', imageUrl: '' });

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
            imageUrl: data.imageUrl || '', // Memastikan gambar tetap ada
          });
        } else {
          console.error("Berita tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching berita:", error);
      }
    };

    fetchBerita();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/berita/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judul: berita.title,
          konten: berita.content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Berita setelah diedit:', data);
        navigate('/berita'); // Kembali ke halaman daftar berita
      } else {
        console.error("Gagal menyimpan perubahan berita");
      }
    } catch (error) {
      console.error('Error updating berita:', error);
    }
  };

  const handleBack = () => {
    navigate('/berita');
  };

  return (
    <div className="p-6 bg-white h-full w-full">
      <div className="p-10">
        <div className='text-center pb-4'>
          <h1 className="text-2xl font-medium text-gray-800">Edit Berita</h1>
        </div>
        {berita.imageUrl && (
          <div className="mb-10">
            <div className="flex justify-center items-center">
              <img
                src={berita.imageUrl}
                alt="Preview Gambar Berita"
                className="h-48 object-cover rounded-md max-w-xl"
              />
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg text-gray-700">Judul Berita</label>
            <input
              type="text"
              id="title"
              value={berita.title}
              onChange={(e) => setBerita({ ...berita, title: e.target.value })}
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-lg text-gray-700">Konten</label>
            <textarea
              id="content"
              value={berita.content}
              onChange={(e) => setBerita({ ...berita, content: e.target.value })}
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-lg text-gray-700">URL Gambar Berita</label>
            <input
              type="text"
              id="imageUrl"
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
              value={berita.imageUrl}
              onChange={(e) => setBerita({ ...berita, imageUrl: e.target.value })}
              placeholder="Masukkan URL gambar"
            />
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
