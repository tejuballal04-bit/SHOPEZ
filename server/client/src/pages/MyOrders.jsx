import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await api.get("/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ORDERS:", response.data);

      setOrders(response.data);
    } catch (error) {
      console.error("Order Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");

        navigate("/login");
        return;
      }

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

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order deleted successfully! 🗑️");

      fetchOrders();
    } catch (error) {
      console.error("Delete Order Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete order"
      );
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "75vh",
          backgroundColor: "#faf7ff",
        }}
      >
        <div className="text-center">

          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#8b5cf6",
            }}
          ></div>

          <p
            className="mt-3"
            style={{
              color: "#6b6375",
            }}
          >
            Loading your orders...
          </p>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container text-center py-5"
        style={{
          minHeight: "70vh",
        }}
      >

        <div
          style={{
            fontSize: "60px",
          }}
        >
          😕
        </div>

        <h4
          className="fw-bold mt-3"
          style={{
            color: "#08060d",
          }}
        >
          {error}
        </h4>

        <button
          className="btn mt-3"
          style={{
            backgroundColor: "#8b5cf6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
          }}
          onClick={fetchOrders}
        >
          Try Again
        </button>

      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#faf7ff",
        minHeight: "85vh",
        padding: "50px 0",
      }}
    >

      <div className="container">


        <div className="text-center mb-5">

          <span
            style={{
              color: "#8b5cf6",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1.5px",
            }}
          >
            YOUR SHOPPING JOURNEY
          </span>

          <h1
            className="fw-bold mt-2 mb-2"
            style={{
              color: "#08060d",
              fontSize: "clamp(28px, 4vw, 40px)",
            }}
          >
            My Orders 📦
          </h1>

          <p
            className="mb-0"
            style={{
              color: "#6b6375",
            }}
          >
            Track and manage your SHOPEZ orders.
          </p>

        </div>


        {orders.length === 0 ? (

          <div
            className="text-center p-5 mx-auto"
            style={{
              maxWidth: "650px",
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #eee7f8",
              boxShadow:
                "0 10px 30px rgba(139,92,246,0.08)",
            }}
          >

            <div
              style={{
                fontSize: "70px",
              }}
            >
              📦
            </div>

            <h4
              className="fw-bold mt-3"
              style={{
                color: "#08060d",
              }}
            >
              No orders yet
            </h4>

            <p
              style={{
                color: "#6b6375",
              }}
            >
              You haven't placed any orders yet.
              Start shopping and find something you love!
            </p>

            <button
              className="btn mt-3"
              style={{
                backgroundColor: "#8b5cf6",
                color: "#fff",
                border: "none",
                borderRadius: "9px",
                padding: "11px 28px",
                fontWeight: "600",
              }}
              onClick={() => navigate("/products")}
            >
              Start Shopping →
            </button>

          </div>

        ) : (


          <div className="row g-4">

            {orders.map((order) => (

              <div
                className="col-lg-6"
                key={order._id}
              >

                <div
                  className="h-100"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #eee7f8",
                    boxShadow:
                      "0 8px 25px rgba(139,92,246,0.08)",
                    overflow: "hidden",
                  }}
                >

                  <div
                    className="p-4"
                    style={{
                      background:
                        "linear-gradient(135deg, #f4eaff, #fbf8ff)",
                      borderBottom:
                        "1px solid #eee7f8",
                    }}
                  >

                    <div className="d-flex justify-content-between align-items-start">

                      <div>

                        <span
                          style={{
                            fontSize: "12px",
                            color: "#8b5cf6",
                            fontWeight: "600",
                            letterSpacing: "1px",
                          }}
                        >
                          ORDER ID
                        </span>

                        <p
                          className="mb-0 mt-1 fw-bold"
                          style={{
                            color: "#08060d",
                            fontSize: "14px",
                            wordBreak: "break-all",
                          }}
                        >
                          #{order._id}
                        </p>

                      </div>



                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor:
                            order.status === "Delivered"
                              ? "#dcfce7"
                              : order.status === "Cancelled"
                              ? "#fee2e2"
                              : "#fef3c7",

                          color:
                            order.status === "Delivered"
                              ? "#15803d"
                              : order.status === "Cancelled"
                              ? "#dc2626"
                              : "#a16207",

                          fontSize: "12px",
                        }}
                      >
                        {order.status}
                      </span>

                    </div>

                  </div>



                  <div className="p-4">


                    <div className="row mb-4">

                      <div className="col-6">

                        <small
                          style={{
                            color: "#8a8393",
                          }}
                        >
                          ORDER DATE
                        </small>

                        <p
                          className="fw-semibold mb-0 mt-1"
                          style={{
                            color: "#08060d",
                          }}
                        >
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>


                      <div className="col-6 text-end">

                        <small
                          style={{
                            color: "#8a8393",
                          }}
                        >
                          TOTAL AMOUNT
                        </small>

                        <p
                          className="fw-bold mb-0 mt-1"
                          style={{
                            color: "#8b5cf6",
                            fontSize: "20px",
                          }}
                        >
                          ₹{order.totalAmount}
                        </p>

                      </div>

                    </div>



                    <div
                      className="mb-4"
                      style={{
                        backgroundColor: "#faf9fc",
                        borderRadius: "12px",
                        padding: "15px",
                      }}
                    >

                      <div className="d-flex align-items-center mb-3">

                        <span
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          🛍️
                        </span>

                        <h6
                          className="fw-bold mb-0 ms-2"
                          style={{
                            color: "#08060d",
                          }}
                        >
                          Order Items
                        </h6>

                      </div>


                      {order.items &&
                      order.items.length > 0 ? (

                        order.items.map((item) => (

                          <div
                            key={item._id}
                            className="d-flex justify-content-between align-items-center py-2"
                            style={{
                              borderBottom:
                                "1px solid #e9e5ef",
                            }}
                          >

                            <div>

                              <p
                                className="mb-1 fw-semibold"
                                style={{
                                  color: "#08060d",
                                  fontSize: "14px",
                                }}
                              >
                                {item.product?.name ||
                                  "Product"}
                              </p>

                              <small
                                style={{
                                  color: "#6b6375",
                                }}
                              >
                                Quantity: {item.quantity}
                              </small>

                            </div>


                            <span
                              className="fw-semibold"
                              style={{
                                color: "#6b6375",
                                fontSize: "14px",
                              }}
                            >
                              ₹{item.price}
                            </span>

                          </div>

                        ))

                      ) : (

                        <p
                          className="text-muted mb-0"
                        >
                          No items found.
                        </p>

                      )}

                    </div>


                    <div className="mb-4">

                      <div className="d-flex align-items-center mb-2">

                        <span
                          style={{
                            fontSize: "19px",
                          }}
                        >
                          📍
                        </span>

                        <h6
                          className="fw-bold mb-0 ms-2"
                          style={{
                            color: "#08060d",
                          }}
                        >
                          Delivery Address
                        </h6>

                      </div>

                      <div
                        className="ps-4"
                        style={{
                          color: "#6b6375",
                          fontSize: "14px",
                          lineHeight: "1.6",
                        }}
                      >

                        <div>
                          {order.shippingAddress?.address}
                        </div>

                        <div>
                          {order.shippingAddress?.city},{" "}
                          {order.shippingAddress?.state}
                        </div>

                        <div>
                          Pincode:{" "}
                          {order.shippingAddress?.pincode}
                        </div>

                      </div>

                    </div>


                    <button
                      className="btn btn-sm w-100"
                      style={{
                        backgroundColor: "#fff1f2",
                        color: "#dc2626",
                        border: "1px solid #fecdd3",
                        borderRadius: "8px",
                        padding: "9px",
                        fontWeight: "600",
                      }}
                      onClick={() =>
                        handleDelete(order._id)
                      }
                    >
                       Delete Order
                    </button>

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

export default MyOrders;