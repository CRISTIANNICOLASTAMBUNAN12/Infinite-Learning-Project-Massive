import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahEdukasi = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEdukasi = {
            id: Date.now(), // Generate a unique ID for the new edukasi
            title,
            description,
            imageUrl,
            date: new Date().toLocaleDateString(),
            status: 'draft', // Set default status to draft
        };
        // Assuming we are adding the new edukasi to a global state or API here
        console.log('Artikel Baru:', newEdukasi);
        navigate('/edukasi'); // Redirect back to the Edukasi page
    };

    // Fungsi untuk tombol kembali
    const handleBack = () => {
        navigate('/edukasi'); // Redirect ke halaman daftar berita
    };

    return (
        <div className="p-6 bg-white w-full h-full">
            <div className='text-center pb-4'>
                <h1 className="text-2xl font-medium text-gray-800 p-10">Tambah Artikel Edukasi</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-lg text-gray-700">Judul Artikel</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-lg text-gray-700">Deskripsi</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
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
                        className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        Simpan Edukasi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TambahEdukasi;
