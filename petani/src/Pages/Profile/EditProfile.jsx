import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { assets } from "../../assets/assets";

function EditProfile({ onProfileUpdated }) {
  const [profileData, setProfileData] = useState({
    nama: "",
    lokasi: "",
    metode_pertanian: "",
    produk_ditawarkan: "",
    bio: "",
    imageUrl: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("/api/profil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            ...data.data,
            imageUrl: data.data.imageUrl || "",
          });
        } else {
          console.error("Failed to fetch profile data");
          setError("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data");
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prevState) => ({
        ...prevState,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileData((prevState) => ({
      ...prevState,
      image: null,
    }));
    setPreviewImage(null);
    document.getElementById("gambar").value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return alert("Please login first");
    }

    const formData = new FormData();
    formData.append("nama", profileData.nama);
    formData.append("lokasi", profileData.lokasi);
    formData.append("metode_pertanian", profileData.metode_pertanian);
    formData.append("produk_ditawarkan", profileData.produk_ditawarkan);
    formData.append("bio", profileData.bio);

    if (profileData.image) {
      formData.append("gambar", profileData.image);
    } else if (profileData.imageUrl) {
      formData.append("gambar", profileData.imageUrl);
    }

    try {
      const response = await fetch("/api/profil", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setLoading(false);

      if (response.ok) {
        alert("Profile updated successfully");
        if (onProfileUpdated) {
          onProfileUpdated();
        }
        navigate("/profil");
      } else {
        const result = await response.json();
        setError(result.message || "Failed to update profile");
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      setError("Error updating profile");
      alert("Error updating profile");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Profile Image Section */}
          <div className="flex-shrink-0">
            <div className="relative mb-8">
              <img
                src={
                  previewImage ||
                  `http://localhost:4000${
                    profileData?.gambar || assets.upload_area
                  }`
                }
                alt="Profile Preview"
                className="w-64 h-64 rounded-full border-4 object-cover mx-auto"
                onError={(e) => {
                  e.target.src = assets.upload_area; // Use fallback image
                }}
              />

              {previewImage && (
                <div className="flex justify-center mt-4">
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
              <div className="mt-4">
                <label className="block text-sm text-gray-500">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="gambar"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-md"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* Profile Edit Form Section */}
          <form
            className="flex-1 flex flex-col w-full md:w-96"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Informasi Lengkap
            </h3>

            {/* Input Fields */}
            <div className="mb-4">
              <label className="block text-sm text-gray-500">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={profileData.nama}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-500">Lokasi</label>
              <input
                type="text"
                name="lokasi"
                value={profileData.lokasi}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-500">
                Metode Pertanian
              </label>
              <input
                type="text"
                name="metode_pertanian"
                value={profileData.metode_pertanian}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-500">
                Produk Ditawarkan
              </label>
              <input
                type="text"
                name="produk_ditawarkan"
                value={profileData.produk_ditawarkan}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-500">Bio</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
