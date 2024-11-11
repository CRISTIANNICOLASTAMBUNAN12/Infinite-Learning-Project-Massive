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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi untuk menangani login
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    if (role === 'admin') {
      navigate('/dashboard');
    }
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    setIsAuthenticated(false);  // Logout the user
    setRole(''); // Reset role
    navigate('/'); // Redirect ke halaman login
  };

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex flex-col h-screen">
        {/* Navbar hanya ditampilkan jika user sudah login dan role 'admin' */}
        {isAuthenticated && role === 'admin' && (
          <Navbar 
            setIsAuthenticated={setIsAuthenticated} 
            toggleSidebar={toggleSidebar} 
            handleLogout={handleLogout} // Pass handleLogout ke Navbar
          />
        )}
        <div className="flex flex-1 relative">
          {/* Sidebar hanya ditampilkan jika user sudah login dan role 'admin' */}
          {isAuthenticated && role === 'admin' && (
            <Sidebar 
              isOpen={isSidebarOpen} 
              toggleSidebar={toggleSidebar} 
              handleLogout={handleLogout} // Pass handleLogout ke Sidebar
            />
          )}
          <div className="flex-1 p-4 overflow-y-auto bg-softGreen z-0">
            {/* Routing untuk halaman utama */}
            <Routes>
              <Route 
                path="/" 
                element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} onLogin={handleLogin} />} 
              />
              <Route 
                path="/dashboard" 
                element={isAuthenticated && role === 'admin' ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} 
              />
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
