import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Header({setToken}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userPhoto, setUserPhoto] = useState(null);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.photo) {
          setUserPhoto(`${import.meta.env.VITE_API_URL}/uploads/${res.data.photo}`);
        }
        if (res.data.name) {
          setUsername(res.data.name);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.clear();
    setUserPhoto(null);
    setToken(null); // This triggers App to re-render without header or navbar
    navigate("/login");
  };
  

  return (
    <header className="py-3 w-full flex items-center justify-between px-6 border-b border-white/10 bg-black relative z-10">
      {/* Left: App name */}
      <h1 className="text-3xl font-semibold tracking-wide">
        CreatorApp
      </h1>

      {/* Right: Profile + Dropdown */}
      {token && (
    <div className="relative" ref={dropdownRef}>
      {userPhoto && (
        <img
          src={userPhoto}
          alt="User"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 rounded-full object-cover border border-white/10 cursor-pointer"
        />
      )}

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-[#1e1e1e] border border-white/10 rounded-md shadow-lg p-4 space-y-3 text-sm">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-white/70 text-lg hover:text-white"
          >
            <UserIcon className="h-5 w-5" />
            <span>{username}</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-white/70 text-lg hover:text-white"
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      )}
    </div>
      )}
    </header>
  );
}
