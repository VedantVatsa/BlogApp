import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import BlogPost from "./BlogPost";
import RichTextEditor from "./RichTextEditor"; // Add this import

const Home = ({ isAuthenticated, setIsAuthenticated, userRole, userEmail }) => {
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("blogs");
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    isValid: false,
  });
  const [newComment, setNewComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const validateBlog = (blog) => {
    if (!blog.title.trim()) return false;
    if (!blog.content || blog.content.trim() === "<p><br></p>") return false;
    return true;
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateBlog(newBlog)) {
      setError("Please fill in both title and content");
      return;
    }

    try {
      // Ensure ID is URL-safe and unique
      const blogId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
      const newBlogPost = {
        id: blogId,
        title: newBlog.title,
        content: newBlog.content,
        author: userEmail,
        comments: [],
        createdAt: new Date().toISOString(),
        lastEdited: null,
      };

      setBlogs((prevBlogs) => [newBlogPost, ...prevBlogs]);
      setNewBlog({ title: "", content: "", isValid: false });
      setShowPreview(false);
    } catch (error) {
      setError("Failed to create blog post. Please try again.");
    }
  };

  const handleAddComment = (blogIndex, commentData) => {
    const updatedBlogs = [...blogs];
    if (Array.isArray(commentData)) {
      // Handling replies
      updatedBlogs[blogIndex].comments = commentData;
    } else {
      // Handling new comments
      updatedBlogs[blogIndex].comments.push(commentData);
    }
    setBlogs(updatedBlogs);
  };

  const handleDeleteBlog = (blogIndex) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs((prevBlogs) =>
        prevBlogs.filter((_, index) => index !== blogIndex)
      );
    }
  };

  const handleEditBlog = (blogIndex, updatedBlog) => {
    setBlogs((prevBlogs) => {
      const newBlogs = [...prevBlogs];
      newBlogs[blogIndex] = {
        ...newBlogs[blogIndex],
        ...updatedBlog,
        lastEdited: new Date().toISOString(),
      };
      return newBlogs;
    });
  };

  const handleContentChange = (content) => {
    setNewBlog((prev) => ({
      ...prev,
      content,
      isValid: validateBlog({ ...prev, content }),
    }));
  };

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-radial from-gray-50 via-gray-100 to-gray-200">
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-8 max-w-7xl w-full">
        {" "}
        {/* Added pt-24 for padding top */}
        <div className="glass-effect rounded-2xl p-8 mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-display font-bold text-center bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text mb-4">
            Welcome to Pensieve
          </h1>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
            Where thoughts flow freely and stories come to life
          </p>

          <div className="mt-8 relative">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern pl-12"
            />
            <svg
              className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 animate-bounce-subtle"
              // ...existing svg path...
            />
          </div>
        </div>
        {/* Modified Add Blog Form - removed hover effect */}
        {isAuthenticated && userRole === "admin" && (
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Create New Story
                </h2>
              </div>

              <form onSubmit={handleAddBlog} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {error}
                  </div>
                )}

                <div className="group">
                  <input
                    type="text"
                    placeholder="Enter your title..."
                    value={newBlog.title}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        title: e.target.value,
                        isValid: validateBlog({
                          ...prev,
                          title: e.target.value,
                        }),
                      }))
                    }
                    className="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/20 rounded-xl 
                             focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 
                             transition-all duration-300 text-lg font-display
                             placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="relative group">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                                rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                  <RichTextEditor
                    value={newBlog.content}
                    onChange={handleContentChange}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </button>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setNewBlog({ title: "", content: "", isValid: false });
                        setError(null);
                        setShowPreview(false);
                      }}
                      className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 
                               hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      disabled={!newBlog.isValid}
                      className={`px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600
                      text-white font-bold transition-all duration-300
                      ${
                        newBlog.isValid
                          ? "hover:from-purple-700 hover:to-pink-700 opacity-100"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Publish Post
                    </button>
                  </div>
                </div>
              </form>

              {showPreview && (
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <article className="prose prose-lg max-w-none">
                    <h1>{newBlog.title}</h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: newBlog.content }}
                    />
                  </article>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Enhanced Welcome Message */}
        {!isAuthenticated && (
          <div className="mb-12 relative group">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl -z-10 
                          group-hover:from-blue-600/40 group-hover:via-purple-600/40 group-hover:to-pink-600/40 transition-all duration-500"
            ></div>
            <div className="glass-effect rounded-2xl p-8 relative overflow-hidden group-hover:scale-[1.01] transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Join Our Community
                  </h2>
                  <p className="mt-2 text-gray-600 max-w-md">
                    Share your stories, engage with other writers, and be part
                    of something special.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/login"
                    className="btn-modern px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl
                             hover:from-primary-600 hover:to-accent-600 transform hover:-translate-y-0.5 transition-all duration-300
                             shadow-lg hover:shadow-xl hover:shadow-primary-500/20"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Sign In</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>

                  <Link
                    to="/signup"
                    className="btn-modern px-8 py-3 border-2 border-primary-500 text-primary-600 rounded-xl
                             hover:bg-primary-50 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Create Account
                  </Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary-500 animate-ping"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-accent-500 animate-ping animation-delay-2000"></div>
            </div>
          </div>
        )}
        {/* Blog posts section */}
        <div className="space-y-6">
          {currentBlogs.length === 0 ? (
            <p className="text-gray-500 text-center">No blog posts yet!</p>
          ) : (
            currentBlogs.map((blog, index) => (
              <BlogPost
                key={blog.id || index}
                index={index}
                id={blog.id} // Pass the unique id
                {...blog}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                onAddComment={(comment) => handleAddComment(index, comment)}
                onDelete={() => handleDeleteBlog(index)}
                onEdit={(content) => handleEditBlog(index, content)}
                currentUser={userEmail}
              />
            ))
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({
            length: Math.ceil(filteredBlogs.length / blogsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
