import React from 'react';
import './Login.css';

function App() {
  return (
    <>
      <LeftPanel />
      <RightPanel />
    </>
  );
}

function LeftPanel() {
  return (
    <div className="left">
      <div className="welcome-message">
        <h1>Selamat Datang!</h1>
        <p>Selamat Datang! Mari Bergabung Bersama Kami untuk Masa Depan Pertanian yang Lebih Baik.</p>
        <button>Masuk</button>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="right">
      <div className="register-form">
        <h2>Daftar Akun</h2>
        <p>Gunakan email anda untuk registrasi</p>
        <input type="text" placeholder="Nama" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Kata sandi" />
        <button>Daftar</button>
      </div>
    </div>
  );
}

export default App;
