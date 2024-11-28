import React from 'react';
import { Link } from 'react-router-dom';

function EditProfile() {
  return (
    <div className="max-w-screen-xl mx-auto p-6">

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex gap-8 items-start">
          {/* Profile Image Section */}
          <div className="flex-shrink-0">
            <img
              src="/assets/contt.png"
              alt="Profile"
              className="w-80 h-80 rounded-full object-cover"
            />
          </div>

          {/* Profile Edit Form Section */}
          <form className="flex-1 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Lengkap</h3>

            {/* Input Fields */}
            <div className="mb-6">
              <input
                id="full-name"
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <input
                id="address"
                type="text"
                placeholder="Alamat/Lokasi"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <input
                id="phone"
                type="text"
                placeholder="No. HP"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Harvest Section */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Hasil Panen</h3>
            <div className="mb-6">
              <input
                id="harvest-category"
                type="text"
                placeholder="Kategori Hasil Panen"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <input
                id="harvest-type"
                type="text"
                placeholder="Jenis Hasil Panen"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <textarea
                id="description"
                placeholder="Deskripsi"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button
                type="button"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Selesai Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
