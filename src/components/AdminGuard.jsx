import { Navigate } from "react-router-dom";

const AdminGuard = ({ children, userRole }) => {
  if (userRole !== "admin") {
    return <Navigate to="/blogs" replace />;
  }
  return children;
};

export default AdminGuard;
