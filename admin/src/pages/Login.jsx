import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // State untuk error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          kata_sandi: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setRole(data.pengguna.peran);
        localStorage.setItem('token', data.token);

        // Cek peran pengguna dan arahkan sesuai peran
        if (data.pengguna.peran === 'admin') {
          navigate('/admin-dashboard');  // Jika admin, arahkan ke dashboard admin
        } else {
          setErrorMessage('Anda tidak memiliki akses');
          // Arahkan ke halaman login jika bukan admin dan tampilkan pesan error
        }
      } else {
        setErrorMessage(data.message || 'Login gagal');  // Jika login gagal, tampilkan pesan error
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
