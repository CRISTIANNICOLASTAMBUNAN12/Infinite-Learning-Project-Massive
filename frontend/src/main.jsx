import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { createRoot } from 'react-dom/client';
import Home from './Pages/Login/Home.jsx';
import Register from './Pages/Register/Home.jsx';
import Beranda from './Pages/Beranda/App.jsx';
import Blog from './Pages/Blog/App.jsx';
import Profile from './Pages/Profile/App.jsx';
import EditProfile from './Pages/Profile/Edit/App.jsx';
import Pasar from './Pages/Pasar/App.jsx';
import Berita from './Pages/Berita/App.jsx';
import GaleriProfile from './Pages/Profile/Galeri/App.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/beranda" element={<Beranda />} /> {/* Resume route */}
        <Route path="/blog" element={<Blog />} /> {/* Blog route */}
        <Route path="/profile" element={<Profile />} /> {/* Resume route */}
        <Route path="/edit/profile" element={<EditProfile />} /> {/* Resume route */}
        <Route path="/galeri/profile" element={<GaleriProfile />} /> {/* Resume route */}
        <Route path="/berita" element={<Berita />} /> {/* Resume route */}
        <Route path="/pasar" element={<Pasar />} /> {/* Resume route */}
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/register" element={<Register />} /> {/* Resume route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
