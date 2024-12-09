import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.pengguna.peran);
        localStorage.setItem('userid', data.pengguna.id); // Menyimpan userid
        setIsAuthenticated(true);
        setRole(data.pengguna.peran);
        navigate(data.pengguna.peran === 'admin' ? '/admin-dashboard' : '/pasar');
      } else {
        setErrorMessage(data.message || 'Login gagal');
      }
    } catch (error) {
      setErrorMessage('Terjadi kesalahan saat login');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="w-full">
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
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
