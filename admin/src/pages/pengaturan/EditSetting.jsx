import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const EditSetting = () => {
    const [penggunaData, setPenggunaData] = useState({
        nama: '',
        email: '',
        pengalaman: '',
        tentang: '',
        alamat: '',
        jenis_kelamin: '',
        pekerjaan: '',
        no_hp: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isFetching, setIsFetching] = useState(true); // for loading the data initially

    const navigate = useNavigate();

    // Fetch pengguna data saat pertama kali komponen dimuat
    useEffect(() => {
        const fetchPenggunaData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                // Decode the JWT token to get the user ID
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id; // Ambil ID pengguna dari decoded token

                const response = await fetch(`/api/pengguna/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    // Cek apakah response gagal dan tampilkan status dan body responsenya
                    const errorData = await response.json();
                    console.error('Error response:', errorData);  // Tampilkan error response di console
                    throw new Error('Failed to fetch pengguna data');
                }

                const data = await response.json();
                console.log('Fetched data:', data);  // Log data yang diterima dari API

                // Pastikan data yang diterima tidak null dan set ke state
                setPenggunaData({
                    nama: data.data?.nama || '',
                    email: data.data?.email || '',
                    pengalaman: data.data?.pengalaman || '',
                    tentang: data.data?.tentang || '',
                    alamat: data.data?.alamat || '',
                    jenis_kelamin: data.data?.jenis_kelamin || '',
                    pekerjaan: data.data?.pekerjaan || '',
                    no_hp: data.data?.no_hp || '',
                });
            } catch (error) {
                console.error('Error fetching data:', error);  // Log error secara rinci
                setError('Error fetching profile data');
            } finally {
                setIsFetching(false);
            }
        };

        fetchPenggunaData();
    }, []);  // Empty dependency array untuk memanggil hanya sekali setelah komponen dimuat

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPenggunaData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Submit the form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return alert('Please login first');
        }

        // Decode the JWT token to get the user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; // Ambil ID pengguna dari decoded token

        const formData = new FormData();
        formData.append('nama', penggunaData.nama);
        formData.append('email', penggunaData.email);
        formData.append('pengalaman', penggunaData.pengalaman);
        formData.append('tentang', penggunaData.tentang);
        formData.append('alamat', penggunaData.alamat);
        formData.append('jenis_kelamin', penggunaData.jenis_kelamin);
        formData.append('pekerjaan', penggunaData.pekerjaan);
        formData.append('no_hp', penggunaData.no_hp);

        try {
            const response = await fetch(`/api/pengguna/${userId}`, {  // Gunakan userId untuk PUT request
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // Send the form data including the image
            });

            setLoading(false); // Stop loading

            if (response.ok) {
                alert('Pengaturan pengguna updated successfully');
                navigate('/profil'); // Redirect to the Pengaturan pengguna page after success
            } else {
                const result = await response.json();
                setError(result.message || 'Failed to update Pengaturan pengguna');
                alert(result.message || 'Failed to update Pengaturan pengguna');
            }
        } catch (error) {
            setLoading(false); // Stop loading
            console.error('Error updating Pengaturan pengguna:', error);
            setError('Error updating Pengaturan pengguna');
            alert('Error updating Pengaturan pengguna');
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 flex justify-center">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl p-8 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-800 items-center flex flex-col">Pengaturan</h1>

                {/* Display errors if any */}
                {error && <div className="text-red-500 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-500">Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama"
                            value={penggunaData.nama}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={penggunaData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Pengalaman</label>
                        <input
                            type="text"
                            name="pengalaman"
                            value={penggunaData.pengalaman}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Tentang</label>
                        <textarea
                            name="tentang"
                            value={penggunaData.tentang}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Alamat</label>
                        <input
                            type="text"
                            name="alamat"
                            value={penggunaData.alamat}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Jenis Kelamin</label>
                        <select
                            name="jenis_kelamin"
                            value={penggunaData.jenis_kelamin}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Pekerjaan</label>
                        <input
                            type="text"
                            name="pekerjaan"
                            value={penggunaData.pekerjaan}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">No HP</label>
                        <input
                            type="text"
                            name="no_hp"
                            value={penggunaData.no_hp}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditSetting;
