import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  BookmarkIcon,
  FlagIcon,
  ShareIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const shouldShowToast = localStorage.getItem("showCreditToast");
    if (shouldShowToast) {
      toast.success("You earned 5 credits for logging in!", {
        style: {
          backgroundColor: "#1e1e1e",
          color: "white",
        },
      });
      localStorage.removeItem("showCreditToast");
    }
    const fetchFeed = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/feed?page=${page}&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts((prev) => [...prev, ...res.data.posts]);
      setHasMore(res.data.hasMore);
      setLoading(false);
    };
    fetchFeed();
  }, [page]);

  const savePost = async (post) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/post/save`,
      { post },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("You received 5 credits for saving a post!", {
      style: {
        backgroundColor: "#1e1e1e",
        color: "white",
      },
    });
  };

  const reportPost = async (post) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/post/report`,
      { post },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("You received 2 credits for reporting a post!", {
      style: {
        backgroundColor: "#1e1e1e",
        color: "white",
      },
    });
  };

  const sharePost = async (post) => {
    try {
      await navigator.clipboard.writeText(post.url);
      toast.success("Link copied to clipboard!", {
        style: {
          backgroundColor: "#1e1e1e",
          color: "white",
        },
      });
    } catch {
      toast.success("Failed to copy link.");
    }
  };

  const getSourceIcon = (source) => {
    if (source.toLowerCase().includes("hacker news")) {
      return <img src="/icons/hacker.svg" alt="Hacker News" className="h-7 w-7" />;
    }
    if (source.toLowerCase().includes("reddit")) {
      return <img src="/icons/reddit.svg" alt="Reddit" className="h-7 w-7" />;
    }
    return null;
  };

  return (
    <div className="  px-4 py-10 text-white font-[Inter]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-white">
          Home
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, idx) => {
            const isLast = idx === posts.length - 1;
            return (
              <div
                key={idx}
                ref={isLast ? lastPostRef : null}
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
                    {getSourceIcon(post.source)}
                  </div>
                </div>

                {/* Icon Action Row */}
                <div className="flex justify-between items-center text-white">
                  <div className="flex gap-4">
                    <BookmarkIcon
                      onClick={() => savePost(post)}
                      className="h-5 w-5 cursor-pointer hover:text-gray-300"
                    />
                    <FlagIcon
                      onClick={() => reportPost(post)}
                      className="h-5 w-5 cursor-pointer hover:text-gray-300"
                    />
                    <ShareIcon
                      onClick={() => sharePost(post)}
                      className="h-5 w-5 cursor-pointer hover:text-gray-300"
                    />
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
                </div>
              </div>
            );
          })}

          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-white/10 animate-pulse rounded-xl"
              ></div>
            ))}
        </div>

        {!hasMore && !loading && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            You've reached the end of the feed.
          </p>
        )}
      </div>
    </div>
  );
}
