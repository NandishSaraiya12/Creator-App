import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
  }, [token]);

  return (
    <div className="  text-white px-4 py-8 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-white">
          Notifications
        </h1>
        <div className="grid gap-5">
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-center">No notifications yet.</p>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] text-white border border-white/10 rounded-xl p-5 shadow-md transition hover:shadow-lg"
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(notification.date).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
