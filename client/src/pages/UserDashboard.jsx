import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function UserDashboard() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    };
    fetchDashboard();
  }, [token]);

  return (
    <div
      className="  text-white px-4 py-10 font-sans"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-white">
          Dashboard
        </h1>

        {/* Credits and Saved Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-white">Credits</h3>
            <p className="text-3xl font-bold text-white">{data.credits ?? 0}</p>
          </div>

          <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Saved Posts
            </h3>
            <p className="text-white text-xl">
              {data.savedPosts?.length || 0} posts
            </p>
          </div>
        </div>

        {/* Latest Notifications */}
        <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Latest Notifications
          </h3>
          {data.notifications?.length > 0 ? (
            <ul className="space-y-3">
              {data.notifications.map((n, idx) => (
                <li
                  key={idx}
                  className="text-sm text-white/90 border-b border-[#3C3C3C] pb-2"
                >
                  <div>{n.message}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(n.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No notifications yet.</p>
          )}
        </div>

        {/* Saved Posts List */}
        <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Your Saved Posts
          </h3>
          {data.savedPosts?.length > 0 ? (
            <ul className="space-y-4">
              {data.savedPosts.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-[#2a2a2a] hover:shadow-md transition-all space-y-4"
                >
                  {/* Title and Icon Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-1">
                      {post.subreddit && (
                        <span className="inline-block text-xs bg-white/10 text-white/80 px-2 py-0.5 rounded-full mb-1">
                          r/{post.subreddit}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      {post.author && (
                        <p className="text-sm text-white/70">
                          by u/{post.author}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {post.source?.toLowerCase().includes("twitter") && (
                        <img
                          src="/icons/twitter.svg"
                          alt="Twitter"
                          className="h-7 w-7"
                        />
                      )}
                      {post.source?.toLowerCase().includes("reddit") && (
                        <img
                          src="/icons/reddit.svg"
                          alt="Reddit"
                          className="h-7 w-7"
                        />
                      )}
                    </div>
                  </div>

                  {/* View Post Link */}
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                  >
                    View Post
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You haven't saved any posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
