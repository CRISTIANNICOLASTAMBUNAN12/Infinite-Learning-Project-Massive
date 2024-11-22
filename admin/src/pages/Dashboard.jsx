import React, { useState, useEffect } from 'react';
import { FaUsers, FaBoxOpen, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [edukasiCount, setEdukasiCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pengguna, setPengguna] = useState([]);

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
        const response = await fetch('/api/aktivitas');
        if (response.ok) {
          const data = await response.json();
          setRecentActivities(data.activities);
        } else {
          console.error('Failed to fetch activities');
        }
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      }
    };

    fetchRecentActivities();
  }, []);

  return (
    <div className="p-6 h-full w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-WhiteSmoke rounded-full w-24 h-24 flex justify-center items-center mx-6">
            <FaUsers className="text-4xl text-green-600" />
          </div>
          <div className="px-4">
            <h2 className="text-[1rem] font-fontStatistik text-title">Pengguna Terdaftar</h2>
            <p className="text-[1.75rem] leading-[1.167] font-fontStatistik font-bold">{usersCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-WhiteSmoke rounded-full w-24 h-24 flex justify-center items-center mx-6">
            <FaBoxOpen className="text-4xl text-yellow-500" />
          </div>
          <div className="px-4">
            <h2 className="text-[1rem] font-fontStatistik text-title">Produk Terdaftar</h2>
            <p className="text-[1.75rem] leading-[1.167] font-fontStatistik font-bold">{productsCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-WhiteSmoke rounded-full w-24 h-24 flex justify-center items-center mx-6">
            <FaBook className="text-4xl text-blue-600" />
          </div>
          <div className="px-4">
            <h2 className="text-[1rem] font-fontStatistik text-title">Edukasi Terbit</h2>
            <p className="text-[1.75rem] leading-[1.167] font-fontStatistik font-bold">{edukasiCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-title mb-3 capitalize font-medium text-lg">Pengguna Terbaru</h2>
        <table className="min-w-full text-left border-collapse border-spacing-0">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-4 font-medium text-gray-700">Nama</th>
              <th className="py-3 px-4 font-medium text-gray-700">Email</th>
              <th className="py-3 px-4 font-medium text-gray-700">Pekerjaan</th>
            </tr>
          </thead>
          <tbody>
            {pengguna.length > 0 ? (
              pengguna.map((penggunaItem) => (
                <tr className="hover:bg-gray-50 border-b" key={penggunaItem.id}>
                  <td className="py-3 px-4">{penggunaItem.nama}</td>
                  <td className="py-3 px-4">{penggunaItem.email}</td>
                  <td className="py-3 px-4">{penggunaItem.pekerjaan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-3 px-4 text-center text-gray-500 italic"
                >
                  Tidak ada pengguna terbaru
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-title mb-3 capitalize font-medium text-lg">Aktivitas Terbaru</h2>
        <ul className="min-w-full text-left border-collapse border-spacing-0">
          {recentActivities.length > 0 ? (
            recentActivities.slice(0, 4).map((activity, index) => (
              <li key={index} className="border-b py-3 px-4 hover:bg-gray-50">{activity.deskripsi}</li>
            ))
          ) : (
            <li className="py-3 px-4 text-center text-gray-500 italic">Tidak ada aktivitas terbaru.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
