import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PrivateRoute from './components/PrivateRoute';
import Beranda from './Pages/Beranda/Beranda';
import Login from './Pages/Authentikasi/Login/Login';
import Berita from './Pages/Berita/Berita';
import Pasar from './Pages/Pasar/Pasar';
import Blog from './Pages/Blog/Blog';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import Settings from './Pages/pengaturan/Settings';
import EditSetting from './Pages/pengaturan/EditSetting';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import TambahProduk from './Pages/Profile/TambahProduk';
import DetailProduk from './Pages/Profile/DetailProduk';
import EditProduk from './Pages/Profile/EditProduk';
import DetailBlog from './Pages/Blog/DetailBlog';
import DetailBerita from './Pages/Berita/DetailBerita';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [refreshProfileKey, setRefreshProfileKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
      navigate(role === 'petani' ? '/pasar' : '/');
    }
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    localStorage.setItem('token', 'your-token-here');
    localStorage.setItem('role', role);

    navigate(role === 'petani' ? '/pasar' : '/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleProfileUpdated = () => {
    setRefreshProfileKey((prev) => prev + 1);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex flex-col h-screen">
        <Navbar
          isAuthenticated={isAuthenticated}
          role={role}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
        />
        <div className="flex flex-1">
          {isAuthenticated && role === 'petani' && (
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
          )}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={isAuthenticated ? <Pasar /> : <Beranda />} />
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} onLogin={handleLogin} />}
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<DetailBlog />} />
              <Route path="/pasar"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <Pasar />
                  </PrivateRoute>
                }
              />
              <Route path="/berita" element={<Berita />} />
              <Route path="/berita/:id" element={<DetailBerita />} />
              <Route
                path="/profil"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <EditProfile onProfileUpdated={handleProfileUpdated} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tambah-produk"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <TambahProduk />
                  </PrivateRoute>
                }
              />
              <Route
                path="/detail-produk/:id"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <DetailProduk />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-produk/:id"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <EditProduk />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pengaturan"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-pengaturan"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} role={role} requiredRole="petani">
                    <EditSetting />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
        {!isAuthenticated && (
          <Footer
            isAuthenticated={isAuthenticated}
            role={role}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </>
  );
}

export default App;
