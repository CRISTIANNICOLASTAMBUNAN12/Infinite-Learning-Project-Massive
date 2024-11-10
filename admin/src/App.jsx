import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Users from './pages/user/Users';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Berita from './pages/berita/Berita';
import Edukasi from './pages/edukasi/Edukasi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'; // Import halaman login
import TambahUser from './pages/user/TambahUser';
import DetailUser from './pages/user/DetailUser';
import EditUser from './pages/user/EditUser';
import TambahBerita from './pages/berita/TambahBerita';
import DetailBerita from './pages/berita/DetailBerita';
import EditBerita from './pages/berita/EditBerita';
import TambahEdukasi from './pages/edukasi/TambahEdukasi';
import DetailEdukasi from './pages/edukasi/DetailEdukasi';
import EditEdukasi from './pages/edukasi/EditEdukasi';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Status login
  const [role, setRole] = useState(''); // Peran pengguna: admin atau user
  const navigate = useNavigate(); // Hook untuk navigasi

  // Mengarahkan ke dashboard setelah login berhasil
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    if (role === 'admin') {
      navigate('/dashboard'); // Redirect ke dashboard jika admin
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="flex flex-col h-screen">
        {/* Navbar hanya muncul jika sudah login */}
        {isAuthenticated && role === 'admin' && <Navbar setIsAuthenticated={setIsAuthenticated} />}

        <div className="flex flex-1">
          {/* Sidebar hanya muncul jika sudah login sebagai admin */}
          {isAuthenticated && role === 'admin' && <Sidebar />}

          {/* Bagian konten utama */}
          <div className="flex-1 p-4 overflow-y-auto bg-softCream">
            <Routes>
              {/* Halaman login jika belum login */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Dashboard /> // Tampilkan Dashboard jika sudah login
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} onLogin={handleLogin} />
                  )
                }
              />
              {/* Rute admin panel hanya tersedia jika sudah login dan admin */}
              <Route path="/dashboard" element={isAuthenticated && role === 'admin' ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              
              <Route path="/users" element={isAuthenticated && role === 'admin' ? <Users /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/users/tambah" element={isAuthenticated && role === 'admin' ? <TambahUser /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/users/detail/:id" element={isAuthenticated && role === 'admin' ? <DetailUser /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/users/edit/:id" element={isAuthenticated && role === 'admin' ? <EditUser /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />

              <Route path="/berita" element={isAuthenticated && role === 'admin' ? <Berita /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/berita/tambah" element={isAuthenticated && role === 'admin' ? <TambahBerita /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/berita/detail/:id" element={isAuthenticated && role === 'admin' ? <DetailBerita /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/berita/edit/:id" element={isAuthenticated && role === 'admin' ? <EditBerita /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />

              <Route path="/edukasi" element={isAuthenticated && role === 'admin' ? <Edukasi /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/edukasi/tambah" element={isAuthenticated && role === 'admin' ? <TambahEdukasi /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/edukasi/detail/:id" element={isAuthenticated && role === 'admin' ? <DetailEdukasi /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/edukasi/edit/:id" element={isAuthenticated && role === 'admin' ? <EditEdukasi /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
