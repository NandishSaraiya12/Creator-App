import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ bio: "", location: "" });
  const [preview, setPreview] = useState("");
  const [photo, setPhoto] = useState(null);
  const [editMode, setEditMode] = useState({
    bio: false,
    location: false,
    photo: false,
  });
  const [isModified, setIsModified] = useState(false);

  const fileInputRef = useRef();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({ bio: res.data.bio || "", location: res.data.location || "" });
        if (res.data.photo) {
          setPreview(`${import.meta.env.VITE_API_URL}/uploads/${res.data.photo}`);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Error fetching profile. Please log in again.");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
      setIsModified(true);
    }
  };

  const handleEditToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("bio", form.bio);
    data.append("location", form.location);
    if (photo) data.append("photo", photo);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
      setUser(res.data);
      setIsModified(false);
      setEditMode({ bio: false, location: false, photo: false });
    } catch (err) {
      alert("Failed to update profile. Error : ", err);
    }
  };

  if (!user)
    return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div className=" text-white px-4 py-8">
      <div className="max-w-2xl mx-auto bg-[#111111] backdrop-blur-md rounded-xl p-8 border border-[#3C3C3C] shadow-md">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-white text-center">Your Profile</h1>

        <div className="relative w-32 h-32 mx-auto mb-6 group">
          <img
            src={preview}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-[#3C3C3C]"
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition"
          >
            <FaPencilAlt className="text-white text-lg" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          {/* Name and Email (not editable) */}
          <div className="text-sm text-gray-300">
            <div className="mb-8 text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">{user.name}</h3>
              <p className="text-lg text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Bio field */}
          <div className="relative">
            {editMode.bio ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 rounded-lg bg-[#222222] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
              />
            ) : (
              <p className="bg-[#222222] p-3 rounded-lg text-white">
                {form.bio || "No bio set."}
              </p>
            )}
            <FaPencilAlt
              className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-white"
              onClick={() => handleEditToggle("bio")}
            />
          </div>

          {/* Location field */}
          <div className="relative">
            {editMode.location ? (
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#222222] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
              />
            ) : (
              <p className="bg-[#222222] p-3 rounded-lg text-white">
                {form.location || "No location set."}
              </p>
            )}
            <FaPencilAlt
              className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-white"
              onClick={() => handleEditToggle("location")}
            />
          </div>

          {/* Update Button */}
          {isModified && (
            <button
              onClick={handleSubmit}
              className="w-full mt-4 py-3 bg-gradient-to-r from-[#6D28D9] to-[#9B4DFF] hover:from-[#8B5CF6] hover:to-[#9B4DFF] text-white font-semibold rounded-lg transition duration-300"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
