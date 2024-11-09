import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Berita from './pages/Berita';
import Edukasi from './pages/Edukasi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'; // Import halaman login

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
              <Route path="/berita" element={isAuthenticated && role === 'admin' ? <Berita /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/edukasi" element={isAuthenticated && role === 'admin' ? <Edukasi /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
