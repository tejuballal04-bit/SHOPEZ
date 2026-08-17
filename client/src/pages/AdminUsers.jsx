import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/users/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error("Admin Users Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "70vh",
          backgroundColor: "#f8f6f0",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{
              color: "#2f6656",
              width: "3rem",
              height: "3rem",
            }}
          ></div>

          <p
            className="mt-3"
            style={{
              color: "#666",
            }}
          >
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#f8f6f0",
        minHeight: "100vh",
      }}
    >
      <div className="container">

        <button
          className="btn mb-4"
          onClick={() => navigate("/admin")}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 18px",
          }}
        >
          ← Back to Dashboard
        </button>

        <div className="mb-5">
          <span
            className="badge px-3 py-2 mb-2"
            style={{
              backgroundColor: "#fff1c7",
              color: "#856404",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            ADMIN PANEL
          </span>

          <h2
            className="fw-bold mb-2"
            style={{
              color: "#111827",
              fontSize: "34px",
            }}
          >
            Manage Users
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#777",
            }}
          >
            View and manage registered SHOPEZ users.
          </p>
        </div>

        <div
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <h5
            className="fw-bold mb-0"
            style={{
              color: "#111827",
            }}
          >
            All Users
          </h5>

          <span
            className="badge px-3 py-2"
            style={{
              backgroundColor: "#182235",
              color: "white",
              borderRadius: "20px",
            }}
          >
            {users.length}{" "}
            {users.length === 1 ? "User" : "Users"}
          </span>
        </div>

        {users.length === 0 ? (
          <div
            className="text-center p-5"
            style={{
              backgroundColor: "white",
              borderRadius: "18px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: "55px",
              }}
            >
              👥
            </div>

            <h5 className="mt-3 fw-bold">
              No users found
            </h5>

            <p className="text-muted">
              There are no registered users yet.
            </p>
          </div>
        ) : (
          <div className="row">

            {users.map((user) => (
              <div
                className="col-md-6 col-lg-4 mb-4"
                key={user._id}
              >

                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.07)",
                  }}
                >

                  <div
                    style={{
                      height: "7px",
                      backgroundColor: "#e5ad18",
                    }}
                  ></div>

                  <div className="card-body p-4">

                    <div
                      className="d-flex align-items-center mb-4"
                    >

                      <div
                        className="d-flex justify-content-center align-items-center me-3"
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "50%",
                          backgroundColor: "#e8f1ed",
                          color: "#2f6656",
                          fontSize: "23px",
                          fontWeight: "bold",
                        }}
                      >
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <h5
                          className="fw-bold mb-1"
                          style={{
                            color: "#111827",
                          }}
                        >
                          {user.name}
                        </h5>

                        <small
                          style={{
                            color: "#777",
                          }}
                        >
                          Registered User
                        </small>
                      </div>

                    </div>

                    <hr />

                    <div className="mb-3">
                      <small
                        className="d-block mb-1"
                        style={{
                          color: "#888",
                        }}
                      >
                        Email
                      </small>

                      <span
                        style={{
                          color: "#333",
                          wordBreak: "break-word",
                        }}
                      >
                        {user.email}
                      </span>
                    </div>

                    <div className="mb-3">
                      <small
                        className="d-block mb-1"
                        style={{
                          color: "#888",
                        }}
                      >
                        Role
                      </small>

                      <span
                        className="badge px-3 py-2"
                        style={{
                          backgroundColor: user.isAdmin
                            ? "#fff1c7"
                            : "#e8f1ed",
                          color: user.isAdmin
                            ? "#856404"
                            : "#2f6656",
                          borderRadius: "20px",
                        }}
                      >
                        {user.isAdmin
                          ? "Admin"
                          : "User"}
                      </span>
                    </div>

                    <div className="mb-3">
                      <small
                        className="d-block mb-1"
                        style={{
                          color: "#888",
                        }}
                      >
                        User ID
                      </small>

                      <small
                        style={{
                          color: "#555",
                          wordBreak: "break-all",
                        }}
                      >
                        {user._id}
                      </small>
                    </div>

                    <div>
                      <small
                        className="d-block mb-1"
                        style={{
                          color: "#888",
                        }}
                      >
                        Joined On
                      </small>

                      <span
                        style={{
                          color: "#333",
                        }}
                      >
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminUsers;