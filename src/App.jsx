import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";

// Lazy load components
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Home = lazy(() => import("./components/Home"));
const BlogsPage = lazy(() => import("./components/BlogsPage"));
const SingleBlogPost = lazy(() => import("./components/SingleBlogPost"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || null;
  });

  // Save authentication state to localStorage
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userEmail", userEmail);
  }, [isAuthenticated, userRole, userEmail]);

  const clearUserData = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
  };

  return (
    <Router basename="/BlogApp">
      <div className="min-h-screen w-full">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          }
        >
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                  setUserEmail={setUserEmail}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <Home
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={clearUserData}
                  userRole={userRole}
                  userEmail={userEmail}
                />
              }
            />{" "}
            {/* Default route */}
            <Route
              path="/blogs"
              element={
                <BlogsPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={clearUserData}
                  userRole={userRole}
                  userEmail={userEmail}
                />
              }
            />
            <Route
              path="/blog/:id"
              element={
                <SingleBlogPost
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={clearUserData}
                  userRole={userRole}
                  userEmail={userEmail}
                />
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
