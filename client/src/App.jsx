import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Notifications from './pages/Notifications';
import Navbar from './components/Navbar';
import Header from './components/Header';
import UserProfile from './pages/UserProfile';
import { Toaster } from 'react-hot-toast';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [collapsed, setCollapsed] = useState(false);

  const isAuthenticated = !!token;

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='h-screen bg-black'>
      {isAuthenticated ? (
        <div className=" h-full flex flex-col  bg-black text-white font-[Inter] transition-all duration-300">
          {/* Sidebar */}
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

          {/* Main Section */}
          <div className={`flex  flex-col transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
            <Header setToken={setToken} />
            <main className="flex-1 p-6 bg-black overflow-y-auto">
              <Routes>
                <Route path="/feed" element={<Home />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<UserProfile />} />
                {role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
                <Route path="*" element={<Navigate to="/feed" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <div className=" h-full flex flex-col   text-white font-[Inter]">
          {/* Header still shows here */}
          <Header setToken={setToken} />
          <div className="w-full flex flex-1  h-full  justify-center items-center ">
            <Routes>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      )}
      </div>
    </Router>
  );
}

export default App;
