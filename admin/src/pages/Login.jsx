import React, { useState } from 'react';

const Login = ({ setIsAuthenticated, setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Misalnya, hardcoded admin login
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setRole('admin');
    } else {
      alert('Username atau password salah');
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
