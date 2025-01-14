import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { LazyImage } from "./LazyImage";

// Utility functions
const getBlogImage = (content) => {
  const div = document.createElement("div");
  div.innerHTML = content;
  const img = div.querySelector("img");
  return img ? img.src : null;
};

// Memoized BlogCard component
const BlogCard = React.memo(({ blog }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-effect rounded-xl overflow-hidden mb-8"
  >
    <Link to={`/blog/${blog.id}`} className="block">
      <div className="relative aspect-video">
        {getBlogImage(blog.content) ? (
          <LazyImage
            src={getBlogImage(blog.content)}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center">
            <span className="text-4xl">✍️</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
        <div
          className="text-gray-600 line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{
            __html: blog.content.replace(/<img[^>]+>/g, ""),
          }}
        />

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
              {blog.author[0].toUpperCase()}
            </div>
            <span>{blog.author}</span>
          </div>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  </motion.div>
));

const BlogsPage = ({
  isAuthenticated,
  userRole,
  userEmail,
  setIsAuthenticated,
}) => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const loadBlogs = () => {
      try {
        const savedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        setBlogs(savedBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]);
      }
    };
    loadBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent mb-6">
            Explore Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thoughtful writing and unique perspectives from our
            community
          </p>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <input
              type="search"
              placeholder="Search stories..."
              className="w-full px-6 py-4 bg-white rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No stories found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogsPage;
