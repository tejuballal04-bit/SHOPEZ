import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userData);

    if (!user.isAdmin) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedAdminRoute;