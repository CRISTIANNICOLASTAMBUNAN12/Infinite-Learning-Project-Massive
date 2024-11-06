import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createRoot } from 'react-dom/client';
import Home from './Home.jsx';
import Resume from './Resume.jsx'; 
import Contact from './Contact.jsx';
import Projects from './Projects.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/resume" element={<Resume />} /> {/* Resume route */}
        <Route path="/projects" element={<Projects />} /> {/* Resume route */}
        <Route path="/contact" element={<Contact />} /> {/* Resume route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
