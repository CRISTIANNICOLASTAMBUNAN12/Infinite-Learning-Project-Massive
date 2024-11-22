import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { FaTimesCircle } from 'react-icons/fa'; // Import icon for removing image
import { assets } from '../../assets/assets';

const EditProfile = () => {
    const [profileData, setProfileData] = useState({
        nama: '',
        lokasi: '',
        metode_pertanian: '',
        produk_ditawarkan: '',
        bio: '',
        imageUrl: '', // Store the URL of the existing image
        image: null,  // Store the new selected image
    });
    const [previewImage, setPreviewImage] = useState(null); // For image preview before uploading
    const [loading, setLoading] = useState(false); // For showing loading state while updating
    const [error, setError] = useState(''); // For handling error messages

    const navigate = useNavigate(); // Use navigate for redirecting

    // Fetch existing profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch('/api/profil', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        ...data.data,
                        imageUrl: data.data.imageUrl || '', // Set the image URL if available
                    });
                } else {
                    console.error('Failed to fetch profile data');
                    setError('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Error fetching profile data');
            }
        };

        fetchProfileData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData((prevState) => ({
                ...prevState,
                image: file, // Store the new image
            }));
            setPreviewImage(URL.createObjectURL(file)); // Set preview image
        }
    };

    // Remove the selected image
    const handleRemoveImage = () => {
        setProfileData((prevState) => ({
            ...prevState,
            image: null, // Remove the selected image
        }));
        setPreviewImage(null); // Clear the preview image
        document.getElementById('gambar').value = null; // Reset file input
    };

    // Submit the form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Clear any previous errors

        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false); // Stop loading
            return alert('Please login first');
        }

        const formData = new FormData();
        formData.append('nama', profileData.nama);
        formData.append('lokasi', profileData.lokasi);
        formData.append('metode_pertanian', profileData.metode_pertanian);
        formData.append('produk_ditawarkan', profileData.produk_ditawarkan);
        formData.append('bio', profileData.bio);

        // Append the new image if selected, otherwise use the existing image URL
        if (profileData.image) {
            formData.append('gambar', profileData.image);
        } else if (profileData.imageUrl) {
            formData.append('gambar', profileData.imageUrl); // Use existing image if no new one
        }

        try {
            const response = await fetch('/api/profil', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // Send the form data including the image
            });

            setLoading(false); // Stop loading

            if (response.ok) {
                alert('Profile updated successfully');
                navigate('/profil'); // Redirect to the profile page after success
            } else {
                const result = await response.json();
                setError(result.message || 'Failed to update profile');
                alert(result.message || 'Failed to update profile');
            }
        } catch (error) {
            setLoading(false); // Stop loading
            console.error('Error updating profile:', error);
            setError('Error updating profile');
            alert('Error updating profile');
        }
    };

    return (
        <div className="p-6 flex justify-center">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl p-8 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-800 items-center flex flex-col">Edit Profile</h1>

                {/* Display errors if any */}
                {error && <div className="text-red-500 text-sm">{error}</div>}

                {/* Image preview section */}
                <div className="flex flex-col items-center">
                    {(previewImage || profileData.imageUrl || assets.upload_area) ? (
                        <div className="mb-10 relative">
                            <img
                                src={previewImage || `http://localhost:4000${profileData?.gambar || assets.upload_area}`}
                                onError={(e) => {
                                    e.target.src = assets.upload_area;
                                }}
                                alt="Preview Gambar"
                                className="w-40 h-40 rounded-full border-4 object-cover"
                            />
                        </div>
                    ) : (
                        <div className="mb-10 text-center text-gray-500">
                            <p>No profile picture available</p>
                        </div>
                    )}

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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-500">Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama"
                            value={profileData.nama}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Lokasi</label>
                        <input
                            type="text"
                            name="lokasi"
                            value={profileData.lokasi}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Metode Pertanian</label>
                        <input
                            type="text"
                            name="metode_pertanian"
                            value={profileData.metode_pertanian}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Produk Ditawarkan</label>
                        <input
                            type="text"
                            name="produk_ditawarkan"
                            value={profileData.produk_ditawarkan}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Bio</label>
                        <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">Profile Picture</label>
                        <input
                            type="file"
                            id="gambar"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded-md"
                            accept="image/*"
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

export default EditProfile;
