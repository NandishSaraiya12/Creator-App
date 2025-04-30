const axios = require("axios");

exports.getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const start = (page - 1) * limit;
    const end = page * limit;

    // Fetch Reddit posts
    const reddit = await axios.get("https://www.reddit.com/r/popular.json", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MyApp/1.0; +http://localhost)",
      },
    });
    const redditPosts = reddit.data.data.children.map((post) => ({
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      source: "Reddit",
      author: post.data.author,
      subreddit: post.data.subreddit,
    }));

    // Fetch top 20 Hacker News story IDs
    const topIds = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const hnStoryIds = topIds.data.slice(0, 20);

    // Fetch individual story details
    const hnStories = await Promise.all(
      hnStoryIds.map(async (id) => {
        const { data } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return {
          title: data.title,
          url: data.url || `https://news.ycombinator.com/item?id=${id}`,
          source: "Hacker News",
          author: data.by,
          subreddit: null,
        };
      })
    );

    const allPosts = [...redditPosts, ...hnStories];
    // const allPosts = [...hnStories];

    for (let i = allPosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
    }
    const paginatedPosts = allPosts.slice(start, end);
    const hasMore = end < allPosts.length;

    res.json({ posts: paginatedPosts, hasMore });
  } catch (err) {
    console.error("Feed fetch error:", err.message);
    res.status(500).json({ msg: `Error fetching feed ${err}` });
  }
};
