import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', photo: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('photo', form.photo);

    try {
      console.log(`${import.meta.env.VITE_API_URL}/api/auth/register`)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, data);
      toast.success('You received 50 credits for completing registration!',{
        style: {
          backgroundColor: '#1e1e1e',
          color: 'white',
        },
      });
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className=" flex items-center justify-center  text-white font-inter">
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-xl shadow-xl w-[380px]">
        <h2 className="text-3xl font-semibold mb-8 text-center">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>

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

          <div>
            <label className="text-sm text-gray-300">Profile Picture</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 rounded-lg text-white font-medium transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white underline hover:text-gray-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
