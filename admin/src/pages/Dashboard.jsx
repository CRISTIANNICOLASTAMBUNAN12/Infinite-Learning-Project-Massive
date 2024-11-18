import React, { useState, useEffect } from 'react';
import { FaUsers, FaBoxOpen, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // State untuk menyimpan data
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [edukasiCount, setEdukasiCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pengguna, setPengguna] = useState([]);

  // Ambil data dari backend saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token is missing');

        const usersResponse = await fetch('/api/pengguna/jumlah/jumlah-terbaru', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const productsResponse = await fetch('/api/produk/jumlah/jumlah-terbaru', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const edukasiResponse = await fetch('/api/edukasi/jumlah/jumlah-terbaru ', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const usersData = await usersResponse.json();
        const productsData = await productsResponse.json();
        const edukasiData = await edukasiResponse.json();
        setUsersCount(usersData.count);
        setProductsCount(productsData.count);
        setEdukasiCount(edukasiData.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();

    const fetchPengguna = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/pengguna/daftar/tiga/terbaru', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Tambahkan token jika diperlukan
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setPengguna(data.data);
        }
      } catch (error) {
        console.error("Error fetching pengguna:", error);
      }
    };

    fetchPengguna();

    const fetchRecentActivities = async () => {
      try {
        const response = await fetch('/api/aktivitas'); // Ganti dengan URL endpoint API Anda
        if (response.ok) {
          const data = await response.json();
          setRecentActivities(data.activities); // Menyimpan data aktivitas di state
        } else {
          console.error('Failed to fetch activities');
        }
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      }
    };

    fetchRecentActivities();
  }, []);

  const handleTambahPengguna = () => {
    navigate('/users/tambah');
  };

  const handleTambahArtikel = () => {
    navigate('/berita/tambah');
  };

  return (
    <div className="p-6 bg-white border h-full w-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-4xl text-green-600 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Pengguna Terdaftar</h2>
            <p className="text-xl font-bold">{usersCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaBoxOpen className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Produk Terdaftar</h2>
            <p className="text-xl font-bold">{productsCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaBook className="text-4xl text-blue-600 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Edukasi Terbit</h2>
            <p className="text-xl font-bold">{edukasiCount}</p>
          </div>
        </div>
      </div>

      {/* Tabel Pengguna / Transaksi */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Pengguna Terbaru</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Pekerjaan</th>
            </tr>
          </thead>
          <tbody>
            {pengguna.length > 0 ? (
              pengguna.map((penggunaItem) => (
                <tr className="border-b" key={penggunaItem.id}>
                  <td className="py-2 px-4">{penggunaItem.nama}</td>
                  <td className="py-2 px-4">{penggunaItem.email}</td>
                  <td className="py-2 px-4">{penggunaItem.pekerjaan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">Tidak ada pengguna terbaru</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button onClick={handleTambahPengguna} className="bg-green-600 text-white p-4 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105">
          <FaUsers className="mr-3" /> Tambah Pengguna Baru
        </button>
        <button onClick={handleTambahArtikel} className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105">
          <FaBook className="mr-3" /> Tambah Artikel Baru
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Aktivitas Terbaru</h2>
        <ul>
          {recentActivities.length > 0 ? (
            // Membatasi hanya 4 aktivitas terbaru yang ditampilkan
            recentActivities.slice(0, 4).map((activity, index) => (
              <li key={index} className="border-b py-2">{activity.deskripsi}</li>
            ))
          ) : (
            <li className="py-2">Tidak ada aktivitas terbaru.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
