import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/blog/${id}`);
                const data = await response.json();
                setBlog(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>Blog tidak ditemukan.</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={blog.gambar ? `http://localhost:4000${blog.gambar}` : '/default-placeholder.png'}
                    alt={blog.judul || 'Blog'}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800">{blog.judul}</h1>
                    <span className="text-sm text-gray-500">{blog.kategori}</span>
                    <p className="text-gray-500 mt-4">{blog.konten}</p>
                    <div className="mt-6">
                        <p className="text-sm text-gray-600">
                            Ditulis oleh <span className="font-semibold">{blog.nama || 'Pengguna Tidak Dikenal'}</span> pada{' '}
                            {new Date(blog.dibuat_pada).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBlog;
