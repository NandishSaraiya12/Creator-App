import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function AdminDashboard() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    };
    fetchDashboard();
  }, [token]);

  return (
    <div
      className=" text-white px-4 py-10 font-sans"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight">
          Admin Dashboard
        </h1>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{data.totalUsers ?? 0}</p>
          </div>
          <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Credits</h3>
            <p className="text-3xl font-bold">{data.totalCredits ?? 0}</p>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4">Users List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/90">
              <thead>
                <tr className="border-b border-[#3C3C3C] text-white/60">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">Credits</th>
                  <th className="text-left py-2 px-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {data.users?.map((u, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
                  >
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.credits}</td>
                    <td className="py-2 px-4 capitalize">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reported Posts */}
        {data.reportedPosts?.length > 0 && (
          <div className="bg-[#111111] border border-[#3C3C3C] rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Reported Posts</h3>
            <ul className="space-y-4">
              {data.reportedPosts.map((post, idx) => (
                <li
                  key={idx}
                  className="bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-[#2a2a2a] hover:shadow-md transition-all space-y-4"
                >
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

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                  >
                    View Post
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
