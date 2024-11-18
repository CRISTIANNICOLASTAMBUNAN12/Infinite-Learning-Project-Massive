import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Users from './pages/user/Users';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Berita from './pages/berita/Berita';
import Edukasi from './pages/edukasi/Edukasi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'; // Halaman login
import TambahUser from './pages/user/TambahUser';
import DetailUser from './pages/user/DetailUser';
import EditUser from './pages/user/EditUser';
import TambahBerita from './pages/berita/TambahBerita';
import DetailBerita from './pages/berita/DetailBerita';
import EditBerita from './pages/berita/EditBerita';
import TambahEdukasi from './pages/edukasi/TambahEdukasi';
import DetailEdukasi from './pages/edukasi/DetailEdukasi';
import EditEdukasi from './pages/edukasi/EditEdukasi';
import PrivateRoute from './components/PrivateRoute'; // Import komponen PrivateRoute

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Memeriksa apakah ada token di localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    localStorage.setItem('token', 'your-token-here');
    localStorage.setItem('role', role);

    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/'); // Pengguna non-admin ke halaman utama
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect ke halaman login setelah logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex flex-col h-screen">
        {isAuthenticated && role === 'admin' && (
          <Navbar
            setIsAuthenticated={setIsAuthenticated}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
          />
        )}
        <div className="flex flex-1 relative">
          {isAuthenticated && role === 'admin' && (
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              handleLogout={handleLogout}
            />
          )}
          <div className="flex-1 p-4 overflow-y-auto bg-softGreen z-0">
            <Routes>
              {/* Route Login */}
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} onLogin={handleLogin} />} />

              {/* Protected Routes */}
              <Route path="/" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/admin-dashboard"element={ <PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/users" element={<PrivateRoute element={<Users />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/users/tambah" element={<PrivateRoute element={<TambahUser />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/users/detail/:id" element={<PrivateRoute element={<DetailUser />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/users/edit/:id" element={<PrivateRoute element={<EditUser />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />

              {/* Halaman lainnya */}
              <Route path="/berita" element={<PrivateRoute element={<Berita />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/berita/tambah" element={<PrivateRoute element={<TambahBerita />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/berita/detail/:id" element={<PrivateRoute element={<DetailBerita />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/berita/edit/:id" element={<PrivateRoute element={<EditBerita />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/edukasi" element={<PrivateRoute element={<Edukasi />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/edukasi/tambah" element={<PrivateRoute element={<TambahEdukasi />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/edukasi/detail/:id" element={<PrivateRoute element={<DetailEdukasi />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
              <Route path="/edukasi/edit/:id" element={<PrivateRoute element={<EditEdukasi />} isAuthenticated={isAuthenticated} role={role} requiredRole="admin" />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
