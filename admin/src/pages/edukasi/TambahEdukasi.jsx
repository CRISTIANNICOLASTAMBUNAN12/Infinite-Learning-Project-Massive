import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaTimesCircle } from 'react-icons/fa';

const TambahEdukasi = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: '',
        konten: '',
        kategori_id: '',
        gambar: '',
    });
    const [kategoriList, setKategoriList] = useState([]);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchKategori = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/kategori');
            const data = await response.json();
            setKategoriList(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Gagal mengambil kategori');
        }
    };

    useEffect(() => {
        fetchKategori();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('judul', formData.judul);
        formDataToSend.append('konten', formData.konten);
        formDataToSend.append('kategori_id', formData.kategori_id);
        if (formData.gambar) {
            formDataToSend.append('gambar', formData.gambar);
        }

        try {
            const response = await fetch('http://localhost:4000/api/edukasi', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Edukasi berhasil ditambahkan');
                navigate('/edukasi');
            } else {
                toast.error(data.message || 'Gagal menambahkan edukasi');
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat menambahkan edukasi');
            console.error('Error adding edukasi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/edukasi');
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center pb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Tambah Artikel Edukasi</h1>
                <p className="text-gray-500 mt-2">Isi formulir di bawah untuk menambahkan artikel edukasi baru.</p>
            </div>

            {previewImage && (
                <div className="flex justify-center pb-6">
                    <img
                        src={previewImage}
                        alt="Preview Gambar"
                        className="object-cover h-64 w-auto rounded-lg shadow-md"
                    />
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Judul Artikel</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                        placeholder="Masukkan judul artikel"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Konten</label>
                    <textarea
                        name="konten"
                        value={formData.konten}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                        rows="6"
                        placeholder="Masukkan konten artikel"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Kategori</label>
                    <select
                        name="kategori_id"
                        value={formData.kategori_id}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
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
                    <label className="block text-lg font-medium text-gray-700">Gambar Artikel</label>
                    <div className="relative">
                        <input
                            type="file"
                            name="gambar"
                            id="gambarInput"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                        />
                        {isImageSelected && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-3 right-4 text-red-500 hover:text-red-700"
                            >
                                <FaTimesCircle />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center space-x-4">
                    <button
                        onClick={handleBack}
                        type="button"
                        className="flex items-center justify-center w-1/2 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition ease-in-out"
                    >
                        <FaArrowLeft className="mr-2" />
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center w-1/2 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition ease-in-out"
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Edukasi'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TambahEdukasi;
