import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PrivateRoute from './components/PrivateRoute';
import Beranda from '../src/Pages/Beranda/Beranda'
import Login from './Pages/Authentikasi/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Berita from './Pages/Berita/Berita'
import Pasar from './Pages/Pasar/Pasar'
import Blog from './Pages/Blog/Blog'
import Profile from './Pages/Profile/Profile'
import EditProfile from './Pages/Profile/EditProfile'
import Settings from './Pages/pengaturan/Settings'
import EditSetting from './Pages/pengaturan/EditSetting'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshProfileKey, setRefreshProfileKey] = useState(0);

  useEffect(() => {
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

    if (role === 'petani') {
      navigate('/user-dashboard');
    } else {
      navigate('/');
    }
  };

  const handleRegister = () => {

  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfileUpdated = () => {
    setRefreshProfileKey((prev) => prev + 1);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex flex-col h-screen">
        {isAuthenticated ? (
          <Navbar
            setIsAuthenticated={setIsAuthenticated}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
            refreshProfile={refreshProfileKey}
            isAuthenticated={isAuthenticated} // Ini akan disesuaikan dengan status login
            role={role} // Ini mengirimkan role yang sebenarnya
          />
        ) : (
          <Navbar
            setIsAuthenticated={setIsAuthenticated}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
            refreshProfile={refreshProfileKey}
            isAuthenticated={false}
            role={null}
          />
        )}
        <div className="flex flex-1 relative">
          {isAuthenticated && role === 'petani' && (
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              handleLogout={handleLogout}
            />
          )}
          <div className="flex-1 overflow-y-auto z-0">
            <Routes>
              <Route
                path="/"
                element={<Beranda />}
              />
              <Route
                path="/register"
                element={<Login
                  onLogin={handleRegister} />}
              />
              <Route
                path="/login"
                element={<Login
                  setIsAuthenticated={setIsAuthenticated}
                  setRole={setRole}
                  onLogin={handleLogin} />}
              />
              <Route
                path="/user-dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/blog"
                element={<Blog />}
              />
              <Route
                path="/pasar"
                element={<Pasar />}
              />
              <Route
                path="/berita"
                element={<Berita />}
              />
              <Route
                path="/profil"
                element={
                  <PrivateRoute
                    element={<Profile />}
                    isAuthenticated={isAuthenticated}
                    role={role}
                    requiredRole="petani" />}
              />
              <Route
                path="/edit-profile"
                element={
                  <PrivateRoute
                    element={<EditProfile onProfileUpdated={handleProfileUpdated} />}
                    isAuthenticated={isAuthenticated}
                    role={role}
                    requiredRole="petani"
                  />
                }
              />
              <Route
                path="/pengaturan"
                element={<PrivateRoute
                  element={<Settings />}
                  isAuthenticated={isAuthenticated}
                  role={role} requiredRole="petani" />}
              />
              <Route path="/edit-pengaturan"
                element={<PrivateRoute
                  element={<EditSetting />}
                  isAuthenticated={isAuthenticated}
                  role={role} requiredRole="petani" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
