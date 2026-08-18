import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Please login to view your cart.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/cart/${id}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update quantity"
      );
    }
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item removed from cart");

      fetchCart();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "70vh",
          background: "#f8f6f0",
        }}
      >
        <div className="text-center">

          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#2f6657",
            }}
          ></div>

          <p
            className="mt-3"
            style={{
              color: "#5f6b66",
            }}
          >
            Loading your cart...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#f8f6f0",
        minHeight: "85vh",
        paddingTop: "45px",
        paddingBottom: "60px",
      }}
    >

      <div className="container">

        <div className="text-center mb-5">

          <span
            className="badge px-3 py-2 mb-2"
            style={{
              backgroundColor: "#f8edcf",
              color: "#8a6418",
              fontSize: "12px",
              letterSpacing: "0.7px",
              borderRadius: "20px",
            }}
          >
            YOUR SHOPPING BAG
          </span>

          <h2
            className="fw-bold mt-2 mb-2"
            style={{
              color: "#07152f",
              fontSize: "34px",
            }}
          >
            Shopping Cart 🛒
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#64716c",
            }}
          >
            Review your items before checkout.
          </p>

        </div>


        {cartItems.length === 0 ? (

          <div className="row justify-content-center">

            <div className="col-md-6">

              <div
                className="card border-0 shadow-sm text-center"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >


                <div
                  style={{
                    height: "7px",
                    background:
                      "linear-gradient(90deg, #2f6657, #e5b94b)",
                  }}
                ></div>


                <div className="card-body p-5">

                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "50%",
                      background: "#f8edcf",
                      fontSize: "42px",
                    }}
                  >
                    🛒
                  </div>

                  <h4
                    className="fw-bold"
                    style={{
                      color: "#07152f",
                    }}
                  >
                    Your cart is empty
                  </h4>

                  <p
                    className="mb-4"
                    style={{
                      color: "#64716c",
                    }}
                  >
                    Looks like you haven't added anything yet.
                  </p>

                  <button
                    className="btn px-4 py-2 fw-bold"
                    style={{
                      backgroundColor: "#e5b94b",
                      color: "#07152f",
                      border: "none",
                      borderRadius: "9px",
                    }}
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping →
                  </button>

                </div>

              </div>

            </div>

          </div>

        ) : (

          <div className="row g-4">

            <div className="col-lg-8">

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <h5
                      className="fw-bold mb-0"
                      style={{
                        color: "#07152f",
                      }}
                    >
                      Cart Items
                    </h5>

                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        backgroundColor: "#2f6657",
                        color: "#fff",
                      }}
                    >
                      {totalItems} item
                      {totalItems !== 1 ? "s" : ""}
                    </span>

                  </div>


                  {cartItems.map((item) => (

                    <div
                      key={item._id}
                      className="mb-3"
                      style={{
                        border: "1px solid #e4e2d9",
                        borderRadius: "14px",
                        padding: "18px",
                        background: "#ffffff",
                        transition: "all 0.2s ease",
                      }}
                    >

                      <div className="row align-items-center">

                        <div className="col-md-3 text-center mb-3 mb-md-0">

                          <div
                            style={{
                              background: "#f5f3ed",
                              borderRadius: "12px",
                              padding: "8px",
                            }}
                          >

                            <img
                              src={
                                item.product?.image ||
                                "https://via.placeholder.com/200x150?text=No+Image"
                              }
                              alt={item.product?.name}
                              className="img-fluid rounded"
                              style={{
                                height: "125px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />

                          </div>

                        </div>


                        <div className="col-md-5">

                          <span
                            className="badge rounded-pill mb-2"
                            style={{
                              backgroundColor: "#f8edcf",
                              color: "#8a6418",
                              fontSize: "12px",
                            }}
                          >
                            {item.product?.category}
                          </span>


                          {/* NAME */}

                          <h5
                            className="fw-bold mb-1"
                            style={{
                              color: "#07152f",
                            }}
                          >
                            {item.product?.name}
                          </h5>


                          <p
                            className="mb-3"
                            style={{
                              color: "#64716c",
                            }}
                          >
                            ₹{item.price} each
                          </p>


                          <div className="d-flex align-items-center">

                            <span
                              className="me-2"
                              style={{
                                fontSize: "14px",
                                color: "#64716c",
                              }}
                            >
                              Qty:
                            </span>


                            <button
                              className="btn btn-sm fw-bold"
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "7px",
                                border: "1px solid #cfd8d3",
                                background: "#fff",
                                color: "#2f6657",
                              }}
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity === 1}
                            >
                              −
                            </button>

                            <span
                              className="mx-3 fw-bold"
                              style={{
                                minWidth: "20px",
                                textAlign: "center",
                                color: "#07152f",
                              }}
                            >
                              {item.quantity}
                            </span>

                            <button
                              className="btn btn-sm fw-bold"
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "7px",
                                border: "1px solid #cfd8d3",
                                background: "#fff",
                                color: "#2f6657",
                              }}
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>

                          </div>

                        </div>


                        <div className="col-md-4 text-md-end mt-3 mt-md-0">

                          <p
                            className="mb-1"
                            style={{
                              fontSize: "14px",
                              color: "#64716c",
                            }}
                          >
                            Item Total
                          </p>


                          <h5
                            className="fw-bold mb-2"
                            style={{
                              color: "#b8860b",
                              fontSize: "21px",
                            }}
                          >
                            ₹{item.price * item.quantity}
                          </h5>

                          <button
                            className="btn btn-sm"
                            style={{
                              color: "#b54a4a",
                              border: "1px solid #d99a9a",
                              borderRadius: "7px",
                              background: "#fff",
                            }}
                            onClick={() =>
                              handleRemove(item._id)
                            }
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                  <button
                    className="btn mt-2 fw-semibold"
                    style={{
                      border: "1px solid #2f6657",
                      color: "#2f6657",
                      background: "#fff",
                      borderRadius: "8px",
                    }}
                    onClick={() => navigate("/products")}
                  >
                    ← Continue Shopping
                  </button>

                </div>

              </div>

            </div>


            <div className="col-lg-4">

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "sticky",
                  top: "20px",
                }}
              >

                <div
                  style={{
                    height: "7px",
                    background:
                      "linear-gradient(90deg, #2f6657, #e5b94b)",
                  }}
                ></div>


                <div className="card-body p-4">

                  <h5
                    className="fw-bold mb-4"
                    style={{
                      color: "#07152f",
                    }}
                  >
                    Order Summary
                  </h5>



                  <div className="d-flex justify-content-between mb-3">

                    <span
                      style={{
                        color: "#64716c",
                      }}
                    >
                      Items
                    </span>

                    <span
                      className="fw-semibold"
                      style={{
                        color: "#07152f",
                      }}
                    >
                      {totalItems}
                    </span>

                  </div>


                  <div className="d-flex justify-content-between mb-3">

                    <span
                      style={{
                        color: "#64716c",
                      }}
                    >
                      Subtotal
                    </span>

                    <span
                      className="fw-semibold"
                      style={{
                        color: "#07152f",
                      }}
                    >
                      ₹{calculateTotal()}
                    </span>

                  </div>


                  <div className="d-flex justify-content-between mb-3">

                    <span
                      style={{
                        color: "#64716c",
                      }}
                    >
                      Delivery
                    </span>

                    <span
                      className="fw-semibold"
                      style={{
                        color: "#2f6657",
                      }}
                    >
                      FREE
                    </span>

                  </div>


                  <hr />



                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <strong
                      style={{
                        color: "#07152f",
                        fontSize: "17px",
                      }}
                    >
                      Grand Total
                    </strong>

                    <strong
                      style={{
                        color: "#b8860b",
                        fontSize: "24px",
                      }}
                    >
                      ₹{calculateTotal()}
                    </strong>

                  </div>



                  <button
                    className="btn w-100 fw-bold"
                    style={{
                      backgroundColor: "#e5b94b",
                      color: "#07152f",
                      border: "none",
                      borderRadius: "9px",
                      padding: "13px",
                      fontSize: "16px",
                    }}
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout →
                  </button>


                  <p
                    className="text-center mt-3 mb-0"
                    style={{
                      fontSize: "12px",
                      color: "#7a8580",
                    }}
                  >
                    🔒 Secure & safe checkout
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;