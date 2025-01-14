import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogPost from "./BlogPost";
import Navbar from "./Navbar";

const SingleBlogPost = ({
  isAuthenticated,
  userRole,
  userEmail,
  setIsAuthenticated,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setIsLoading(true);
        const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        const foundBlog = blogs.find((b) => b.id === id);
        if (foundBlog) {
          setBlog(foundBlog);
        }
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleDeleteBlog = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        const updatedBlogs = blogs.filter((b) => b.id !== blogId);
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
        navigate("/blogs"); // Redirect to blogs page after deletion
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleEditBlog = (_, updatedBlog) => {
    try {
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updatedBlogs = blogs.map((b) =>
        b.id === id ? { ...b, ...updatedBlog } : b
      );
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlog((prev) => ({ ...prev, ...updatedBlog }));
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleAddComment = (comment) => {
    try {
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updatedBlogs = blogs.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            comments: [...(b.comments || []), comment],
          };
        }
        return b;
      });
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlog((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), comment],
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="container mx-auto px-4 pt-24">
          <div className="glass-effect rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Blog post not found
            </h2>
            <button
              onClick={() => navigate("/blogs")}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Return to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="container mx-auto px-4 pt-24">
        <BlogPost
          {...blog}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          currentUser={userEmail}
          onDelete={() => handleDeleteBlog(blog.id)}
          onEdit={handleEditBlog}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
};

export default SingleBlogPost;
