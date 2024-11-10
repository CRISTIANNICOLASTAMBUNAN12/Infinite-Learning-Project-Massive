import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function App() {
  return (
    <>
      <LeftPanel />
      <RightPanel />
    </>
  );
}

function LeftPanel() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Replace '/register' with your target route
  };

  return (
    <div className="left">
      <div className="welcome-message">
        <h1>Selamat Datang!</h1>
        <p>Selamat Datang! Mari Bergabung Bersama Kami untuk Masa Depan Pertanian yang Lebih Baik.</p>
        <button onClick={handleRegisterClick}>Daftar</button>
      </div>
    </div>
  );
}

function RightPanel() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Replace '/login' with your target route
  };

  return (
    <div className="right">
      <div className="register-form">
        <h2>Masuk Akun</h2>
        <p>Masukkan nama dan kata sandi anda</p>
        <input type="text" placeholder="Nama" />
        <input type="password" placeholder="Kata sandi" />
        <button onClick={handleLoginClick}>Masuk</button>
      </div>
    </div>
  );
}

export default App;
