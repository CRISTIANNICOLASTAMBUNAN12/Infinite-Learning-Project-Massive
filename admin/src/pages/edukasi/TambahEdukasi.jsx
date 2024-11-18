import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TambahEdukasi = () => {
    const navigate = useNavigate();
    const [judul, setJudul] = useState('');
    const [konten, setKonten] = useState('');
    const [kategoriId, setKategoriId] = useState('');
    const [kategoriList, setKategoriList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    // Fungsi untuk mengambil data kategori dari backend
    const fetchKategori = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/kategori');
            const data = await response.json();
            setKategoriList(data);
        } catch (error) {
            console.error("Gagal mengambil data kategori:", error);
            toast.error("Gagal mengambil data kategori");
        }
    };

    // Mengambil data kategori saat komponen dimuat
    useEffect(() => {
        fetchKategori();
    }, []);

    // Fungsi untuk mengirim data edukasi baru ke backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newEdukasi = {
            judul,
            konten,
            kategori_id: kategoriId, // Kirim kategori_id
        };

        try {
            const response = await fetch('http://localhost:4000/api/edukasi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEdukasi),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal menambahkan edukasi');
            }

            toast.success('Edukasi berhasil ditambahkan!');
            navigate('/edukasi'); // Redirect ke halaman daftar edukasi
        } catch (error) {
            toast.error(`Error: ${error.message}`);
            console.error('Error adding edukasi:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk tombol kembali
    const handleBack = () => {
        navigate('/edukasi');
    };

    return (
        <div className="p-6 bg-white w-full h-full">
            <div className='text-center pb-4'>
                <h1 className="text-2xl font-medium text-gray-800 p-10">Tambah Artikel Edukasi</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="judul" className="block text-lg text-gray-700">Judul Artikel</label>
                    <input
                        type="text"
                        id="judul"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="konten" className="block text-lg text-gray-700">Konten</label>
                    <textarea
                        id="konten"
                        value={konten}
                        onChange={(e) => setKonten(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="5"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="kategoriId" className="block text-lg text-gray-700">Kategori</label>
                    <select
                        id="kategoriId"
                        value={kategoriId}
                        onChange={(e) => setKategoriId(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                <div>
                    <label htmlFor="imageUrl" className="block text-lg text-gray-700">URL Gambar</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
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
                        disabled={loading}
                        className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Edukasi'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TambahEdukasi;
