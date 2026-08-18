import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      setIsLoggedIn(!!token);

      if (userData) {
        try {
          const user = JSON.parse(userData);
          setIsAdmin(user?.isAdmin === true);
        } catch (error) {
          console.error("User data error:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkLogin();

    window.addEventListener("login", checkLogin);
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");

    setIsLoggedIn(false);
    setIsAdmin(false);

    window.dispatchEvent(new Event("logout"));

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#2f5d50",
        padding: "14px 0",
      }}
    >
      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            color: "#ffffff",
            fontSize: "24px",
            letterSpacing: "1px",
          }}
        >
          SHOPEZ
        </Link>

        <div className="navbar-nav ms-auto align-items-center">

          <Link
            className="nav-link px-3"
            to="/"
            style={{ color: "#ffffff" }}
          >
            Home
          </Link>

          <Link
            className="nav-link px-3"
            to="/products"
            style={{ color: "#ffffff" }}
          >
            Products
          </Link>

          {isLoggedIn && !isAdmin && (
            <>
              <Link
                className="nav-link px-3"
                to="/cart"
                style={{ color: "#ffffff" }}
              >
                Cart
              </Link>

              <Link
                className="nav-link px-3"
                to="/my-orders"
                style={{ color: "#ffffff" }}
              >
                My Orders
              </Link>
            </>
          )}

          {isAdmin && (
            <Link
              className="nav-link px-3"
              to="/admin"
              style={{ color: "#ffffff" }}
            >
              Admin Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                className="nav-link px-3"
                to="/login"
                style={{ color: "#ffffff" }}
              >
                Login
              </Link>

              <Link
                className="nav-link px-3"
                to="/register"
                style={{ color: "#ffffff" }}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-sm ms-2"
              onClick={handleLogout}
              style={{
                backgroundColor: "#d4a373",
                color: "#222",
                border: "none",
                padding: "7px 18px",
                borderRadius: "6px",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;