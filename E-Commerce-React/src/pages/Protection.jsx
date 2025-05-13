// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const Protection = ({ children }) => {
  const isLoggedIn = document.cookie.includes("token"); // or use context/auth

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default Protection;
