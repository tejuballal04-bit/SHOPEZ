import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  // Dashboard Counts
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Fetch Dashboard Counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Products
        const productsResponse = await api.get("/products");

        // Users
        const usersResponse = await api.get(
          "/users/admin",
          config
        );

        // Orders
        const ordersResponse = await api.get(
          "/orders",
          config
        );

        setProductCount(productsResponse.data.length);
        setUserCount(usersResponse.data.length);
        setOrderCount(ordersResponse.data.length);

      } catch (error) {
        console.error(
          "Error fetching dashboard counts:",
          error
        );
      }
    };

    fetchCounts();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f8f6f0",
        minHeight: "100vh",
        padding: "50px 0",
      }}
    >
      <div className="container">

        <div className="text-center mb-5">

          <span
            className="badge px-3 py-2"
            style={{
              backgroundColor: "#fff1c7",
              color: "#856404",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            SHOPEZ ADMIN PANEL
          </span>

          <h1
            className="fw-bold mt-3 mb-2"
            style={{
              color: "#182235",
              fontSize: "clamp(28px, 4vw, 40px)",
            }}
          >
            Admin Dashboard 👑
          </h1>

          <p
            className="mb-0"
            style={{
              color: "#777",
            }}
          >
            Manage your store from one place.
          </p>

        </div>


        <div className="row g-4">


          {/* ================= PRODUCTS ================= */}

          <div className="col-md-4">

            <div
              className="h-100 text-center"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #eee8dc",
                padding: "35px 25px",
                boxShadow:
                  "0 5px 18px rgba(0,0,0,0.06)",
              }}
            >

              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "20px",
                  backgroundColor: "#e8f1ed",
                  fontSize: "32px",
                }}
              >
                🛍️
              </div>

              <h5
                className="fw-bold"
                style={{
                  color: "#182235",
                }}
              >
                Products
              </h5>

              {/* PRODUCT COUNT */}
              <div
                className="fw-bold mb-1"
                style={{
                  fontSize: "28px",
                  color: "#2f6656",
                }}
              >
                {productCount}
              </div>

              <small
                className="text-muted d-block mb-2"
              >
                Total Products
              </small>

              <p
                style={{
                  color: "#777",
                  fontSize: "14px",
                  minHeight: "42px",
                }}
              >
                Add, edit and manage your store products.
              </p>

              <button
                className="btn w-100 fw-semibold"
                style={{
                  backgroundColor: "#2f6656",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9px",
                  padding: "11px",
                }}
                onClick={() =>
                  navigate("/admin/products")
                }
              >
                Manage Products →
              </button>

            </div>

          </div>


          {/* ================= ORDERS ================= */}

          <div className="col-md-4">

            <div
              className="h-100 text-center"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #eee8dc",
                padding: "35px 25px",
                boxShadow:
                  "0 5px 18px rgba(0,0,0,0.06)",
              }}
            >

              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "20px",
                  backgroundColor: "#fff1c7",
                  fontSize: "32px",
                }}
              >
                📦
              </div>

              <h5
                className="fw-bold"
                style={{
                  color: "#182235",
                }}
              >
                Orders
              </h5>

              {/* ORDER COUNT */}
              <div
                className="fw-bold mb-1"
                style={{
                  fontSize: "28px",
                  color: "#2f6656",
                }}
              >
                {orderCount}
              </div>

              <small
                className="text-muted d-block mb-2"
              >
                Total Orders
              </small>

              <p
                style={{
                  color: "#777",
                  fontSize: "14px",
                  minHeight: "42px",
                }}
              >
                View and manage customer orders.
              </p>

              <button
                className="btn w-100 fw-semibold"
                style={{
                  backgroundColor: "#2f6656",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9px",
                  padding: "11px",
                }}
                onClick={() =>
                  navigate("/admin/orders")
                }
              >
                Manage Orders →
              </button>

            </div>

          </div>


          {/* ================= USERS ================= */}

          <div className="col-md-4">

            <div
              className="h-100 text-center"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #eee8dc",
                padding: "35px 25px",
                boxShadow:
                  "0 5px 18px rgba(0,0,0,0.06)",
              }}
            >

              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "20px",
                  backgroundColor: "#e8f1ed",
                  fontSize: "32px",
                }}
              >
                👥
              </div>

              <h5
                className="fw-bold"
                style={{
                  color: "#182235",
                }}
              >
                Users
              </h5>

              {/* USER COUNT */}
              <div
                className="fw-bold mb-1"
                style={{
                  fontSize: "28px",
                  color: "#2f6656",
                }}
              >
                {userCount}
              </div>

              <small
                className="text-muted d-block mb-2"
              >
                Total Users
              </small>

              <p
                style={{
                  color: "#777",
                  fontSize: "14px",
                  minHeight: "42px",
                }}
              >
                View and manage registered users.
              </p>

              <button
                className="btn w-100 fw-semibold"
                style={{
                  backgroundColor: "#2f6656",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9px",
                  padding: "11px",
                }}
                onClick={() =>
                  navigate("/admin/users")
                }
              >
                Manage Users →
              </button>

            </div>

          </div>

        </div>


        {/* ================= WELCOME ================= */}

        <div
          className="mt-5 text-center"
          style={{
            background:
              "linear-gradient(135deg, #e8f1ed, #fff8df)",
            borderRadius: "18px",
            padding: "30px",
            border: "1px solid #e8e1d2",
          }}
        >

          <div
            style={{
              fontSize: "30px",
            }}
          >
            ✨
          </div>

          <h6
            className="fw-bold mt-2 mb-1"
            style={{
              color: "#182235",
            }}
          >
            Welcome to SHOPEZ Admin
          </h6>

          <p
            className="mb-0"
            style={{
              color: "#777",
              fontSize: "14px",
            }}
          >
            Keep your products, orders and users organized.
          </p>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;