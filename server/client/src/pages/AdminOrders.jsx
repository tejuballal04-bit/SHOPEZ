import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.error("Admin Orders Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order status updated successfully! ✓");

      fetchOrders();
    } catch (error) {
      console.error("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "70vh",
          backgroundColor: "#f7f5ef",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{
              color: "#2f6658",
              width: "3rem",
              height: "3rem",
            }}
          ></div>

          <p className="text-muted mt-3">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container text-center"
        style={{
          paddingTop: "100px",
          minHeight: "70vh",
        }}
      >
        <div style={{ fontSize: "55px" }}>😕</div>

        <h4 className="mt-3 text-danger">
          {error}
        </h4>

        <button
          className="btn mt-3"
          style={{
            backgroundColor: "#2f6658",
            color: "white",
          }}
          onClick={() => navigate("/admin")}
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f7f5ef",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      <div className="container pt-5">

        <button
          className="btn mb-4"
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            borderRadius: "8px",
            padding: "10px 18px",
          }}
          onClick={() => navigate("/admin")}
        >
          ← Back to Dashboard
        </button>

        <div className="text-center mb-5">

          <span
            className="badge rounded-pill px-3 py-2"
            style={{
              backgroundColor: "#fff0c2",
              color: "#8a6500",
            }}
          >
            ORDER MANAGEMENT
          </span>

          <h2
            className="fw-bold mt-3"
            style={{
              color: "#102a43",
              fontSize: "34px",
            }}
          >
            Manage Orders 📦
          </h2>

          <p className="text-muted">
            View and manage customer orders.
          </p>

        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h5
            className="fw-bold mb-0"
            style={{ color: "#102a43" }}
          >
            All Orders
          </h5>

          <span
            className="badge rounded-pill px-3 py-2"
            style={{
              backgroundColor: "#102a43",
              color: "white",
              fontSize: "13px",
            }}
          >
            {orders.length}{" "}
            {orders.length === 1 ? "Order" : "Orders"}
          </span>

        </div>

        {orders.length === 0 ? (
          <div
            className="text-center p-5"
            style={{
              backgroundColor: "white",
              borderRadius: "18px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "60px" }}>
              📦
            </div>

            <h5 className="mt-3">
              No orders found
            </h5>

            <p className="text-muted">
              There are no customer orders yet.
            </p>
          </div>
        ) : (
          orders.map((order) => (

            <div
              className="card border-0 mb-4"
              key={order._id}
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
              }}
            >

              <div
                style={{
                  height: "6px",
                  backgroundColor: "#e7b72f",
                }}
              ></div>

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start flex-wrap mb-4">

                  <div>
                    <span className="text-muted small">
                      ORDER ID
                    </span>

                    <h5
                      className="fw-bold mt-1 mb-0"
                      style={{ color: "#102a43" }}
                    >
                      #{order._id}
                    </h5>
                  </div>

                  <div className="text-end">

                    <span className="text-muted small d-block">
                      ORDER STATUS
                    </span>

                    <span
                      className="badge rounded-pill px-3 py-2 mt-1"
                      style={{
                        backgroundColor:
                          order.status === "Delivered"
                            ? "#d1e7dd"
                            : order.status === "Shipped"
                            ? "#fff0c2"
                            : "#e9ecef",
                        color:
                          order.status === "Delivered"
                            ? "#146c43"
                            : order.status === "Shipped"
                            ? "#856404"
                            : "#495057",
                      }}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>


                <div className="row g-4">

                  <div className="col-lg-6">

                    <div
                      className="p-3 h-100"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                      }}
                    >

                      <h6
                        className="fw-bold mb-3"
                        style={{ color: "#102a43" }}
                      >
                        👤 Customer Details
                      </h6>

                      {order.user ? (
                        <>
                          <p className="mb-2">
                            <strong>Name:</strong>{" "}
                            {order.user.name}
                          </p>

                          <p className="mb-0">
                            <strong>Email:</strong>{" "}
                            {order.user.email}
                          </p>
                        </>
                      ) : (
                        <p className="text-muted mb-0">
                          Customer information unavailable.
                        </p>
                      )}

                    </div>

                  </div>

                  <div className="col-lg-6">

                    <div
                      className="p-3 h-100"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                      }}
                    >

                      <h6
                        className="fw-bold mb-3"
                        style={{ color: "#102a43" }}
                      >
                        🧾 Order Details
                      </h6>

                      <p className="mb-2">
                        <strong>Total Amount:</strong>{" "}
                        <span
                          className="fw-bold"
                          style={{ color: "#2f6658" }}
                        >
                          ₹{order.totalAmount}
                        </span>
                      </p>

                      <p className="mb-0">
                        <strong>Order Date:</strong>{" "}
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-4">

                  <h6
                    className="fw-bold mb-3"
                    style={{ color: "#102a43" }}
                  >
                    🛍️ Ordered Items
                  </h6>

                  <div
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >

                    {order.items &&
                    order.items.length > 0 ? (

                      order.items.map((item) => (

                        <div
                          key={item._id}
                          className="d-flex justify-content-between align-items-center p-3"
                          style={{
                            borderBottom:
                              "1px solid #eee",
                          }}
                        >

                          <div>

                            <strong>
                              {item.product?.name ||
                                "Product"}
                            </strong>

                            <div className="text-muted small mt-1">
                              Quantity: {item.quantity}
                            </div>

                          </div>

                          <span
                            className="fw-bold"
                            style={{
                              color: "#2f6658",
                            }}
                          >
                            ₹{item.price}
                          </span>

                        </div>

                      ))

                    ) : (

                      <p className="text-muted p-3 mb-0">
                        No items found.
                      </p>

                    )}

                  </div>

                </div>

                <div className="mt-4">

                  <h6
                    className="fw-bold mb-3"
                    style={{ color: "#102a43" }}
                  >
                    📍 Shipping Address
                  </h6>

                  <div
                    className="p-3"
                    style={{
                      backgroundColor: "#fffdf5",
                      border: "1px solid #f1e5b8",
                      borderRadius: "12px",
                    }}
                  >

                    <p className="mb-1">
                      {order.shippingAddress?.address}
                    </p>

                    <p className="mb-1">
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.state}
                    </p>

                    <p className="mb-0">
                      <strong>Pincode:</strong>{" "}
                      {order.shippingAddress?.pincode}
                    </p>

                  </div>

                </div>


                <div
                  className="mt-4 pt-4"
                  style={{
                    borderTop: "1px solid #eee",
                  }}
                >

                  <h6
                    className="fw-bold mb-3"
                    style={{ color: "#102a43" }}
                  >
                    Update Order Status
                  </h6>

                  <button
                    className="btn me-2 mb-2"
                    style={{
                      backgroundColor: "#fff0c2",
                      color: "#856404",
                      border: "1px solid #e7c85c",
                      borderRadius: "8px",
                    }}
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Shipped"
                      )
                    }
                    disabled={
                      order.status === "Shipped" ||
                      order.status === "Delivered"
                    }
                  >
                    🚚 Mark Shipped
                  </button>

                  <button
                    className="btn mb-2"
                    style={{
                      backgroundColor: "#2f6658",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Delivered"
                      )
                    }
                    disabled={
                      order.status === "Delivered"
                    }
                  >
                    ✓ Mark Delivered
                  </button>

                </div>

              </div>

            </div>

          ))
        )}

      </div>
    </div>
  );
}

export default AdminOrders;