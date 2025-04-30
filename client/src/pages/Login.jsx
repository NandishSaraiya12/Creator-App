import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) window.location.href = '/feed';
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('showCreditToast', 'true');      
      window.location.href = '/feed';
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className=" flex items-center justify-center h-full  text-white font-inter">
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-xl shadow-xl w-[380px]">
        <h2 className="text-3xl font-semibold mb-8 text-center">Sign in to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 rounded-lg text-white font-medium transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-white underline hover:text-gray-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
