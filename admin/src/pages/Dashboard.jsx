import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaBoxOpen,
  FaBook,
  FaBell,
  FaArrowRight,
  FaCircle
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-semibold text-gray-800">
    {children}
  </h3>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [edukasiCount, setEdukasiCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pengguna, setPengguna] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleClickAllUsers = () => {
    navigate('/users');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token is missing');

        const responses = await Promise.all([
          fetch('/api/pengguna/jumlah/jumlah-terbaru', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/produk/jumlah/jumlah-terbaru', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/edukasi/jumlah/jumlah-terbaru', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('http://localhost:4000/api/pengguna/daftar/tiga/terbaru', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }),
          fetch('/api/aktivitas')
        ]);

        const [usersData, productsData, edukasiData, penggunaData, activitiesData] =
          await Promise.all(responses.map(r => r.json()));

        setUsersCount(usersData.count);
        setProductsCount(productsData.count);
        setEdukasiCount(edukasiData.count);
        setPengguna(penggunaData.data || []);
        setRecentActivities(activitiesData.activities || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Pengguna Terdaftar",
      value: usersCount,
      icon: FaUsers,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Produk Terdaftar",
      value: productsCount,
      icon: FaBoxOpen,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Edukasi Terbit",
      value: edukasiCount,
      icon: FaBook,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-green-300">
            <FaBell className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-4 rounded-full mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {isLoading ? "..." : stat.value.toLocaleString()}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Pengguna Terbaru</CardTitle>
            <button onClick={handleClickAllUsers} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              Lihat Semua <FaArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Nama</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Pekerjaan</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      Memuat data...
                    </td>
                  </tr>
                ) : pengguna.length > 0 ? (
                  pengguna.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-green-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-green-400 text-white flex items-center justify-center mr-3">
                            {user.nama.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900">{user.nama}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-gray-600">{user.pekerjaan}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      Tidak ada pengguna terbaru
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4 text-gray-500">Memuat aktivitas...</div>
          ) : recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.slice(0, 4).map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 hover:bg-green-50 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaBell className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-700">{activity.deskripsi}</p>
                    <p className="text-sm text-gray-500">Baru saja</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <p className="text-yellow-700">Tidak ada aktivitas terbaru.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;