import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEdukasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edukasi, setEdukasi] = useState(null);

  // Mengambil data edukasi berdasarkan ID dari backend
  useEffect(() => {
    const fetchEdukasi = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/edukasi/${id}`);
        const data = await response.json();
        if (response.ok) {
          setEdukasi(data);
        } else {
          console.error('Gagal mengambil data edukasi:', data.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data edukasi:', error);
      }
    };
    fetchEdukasi();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEdukasi = {
      judul: edukasi.judul,
      konten: edukasi.konten,
      kategori_id: edukasi.kategori_id,  // Pastikan kategori_id sudah tersedia
    };

    try {
      const response = await fetch(`http://localhost:4000/api/edukasi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEdukasi),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Edukasi berhasil diperbarui:', data);
        navigate('/edukasi');
      } else {
        console.error('Gagal memperbarui edukasi:', data.message);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memperbarui edukasi:', error);
    }
  };

  const handleBack = () => {
    navigate('/edukasi');
  };

  if (!edukasi) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white h-full w-full">
      <div className="p-10">
        <div className='text-center pb-4'>
          <h1 className="text-2xl font-medium text-gray-800">Edit Edukasi</h1>
        </div>
        {edukasi.imageUrl && (
          <div className="mb-10">
            <div className="flex justify-center items-center">
              <img
                src={edukasi.imageUrl}
                alt="Preview Gambar Edukasi"
                className="h-48 object-cover rounded-md max-w-xl"
              />
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="judul" className="block text-lg text-gray-700">Judul Artikel</label>
            <input
              type="text"
              id="judul"
              value={edukasi.judul}
              onChange={(e) => setEdukasi({ ...edukasi, judul: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="konten" className="block text-lg text-gray-700">Deskripsi</label>
            <textarea
              id="konten"
              value={edukasi.konten}
              onChange={(e) => setEdukasi({ ...edukasi, konten: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-lg text-gray-700">URL Gambar</label>
            <input
              type="text"
              id="imageUrl"
              value={edukasi.imageUrl}
              onChange={(e) => setEdukasi({ ...edukasi, imageUrl: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
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
              Simpan Edukasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEdukasi;
