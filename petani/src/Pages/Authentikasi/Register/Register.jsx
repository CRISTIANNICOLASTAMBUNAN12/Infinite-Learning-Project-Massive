import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  return (
    <>
      <LeftPanel />
      <RightPanel />
    </>
  );
}

function LeftPanel() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Update '/login' with your actual login route
  };

  return (
    <div className="left">
      <div className="welcome-message">
        <h1>Selamat Datang!</h1>
        <p>Selamat Datang! Mari Bergabung Bersama Kami untuk Masa Depan Pertanian yang Lebih Baik.</p>
        <button onClick={handleLoginClick}>Masuk</button>
      </div>
    </div>
  );
}

function RightPanel() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Update '/register' with your actual register route
  };

  return (
    <div className="right">
      <div className="register-form">
        <h2>Daftar Akun</h2>
        <p>Gunakan email anda untuk registrasi</p>
        <input type="text" placeholder="Nama" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Kata sandi" />
        <button onClick={handleRegisterClick}>Daftar</button>
      </div>
    </div>
  );
}

export default Register;
