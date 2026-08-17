import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    const cleanAddress = address.trim();
    const cleanCity = city.trim();
    const cleanState = state.trim();
    const cleanPincode = pincode.trim();

    if (
      !cleanAddress ||
      !cleanCity ||
      !cleanState ||
      !cleanPincode
    ) {
      alert("Please fill all shipping details.");
      return;
    }

    if (!/^[0-9]{6}$/.test(cleanPincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      const cartResponse = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartItems = cartResponse.data;

      console.log("CART ITEMS:", cartItems);

      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty.");
        navigate("/products");
        return;
      }

      const items = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      console.log("ORDER ITEMS:", items);

      const response = await api.post(
        "/orders",
        {
          items,
          shippingAddress: {
            address: cleanAddress,
            city: cleanCity,
            state: cleanState,
            pincode: cleanPincode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDER RESPONSE:", response.data);

      alert("Order placed successfully! 🎉");

      navigate("/my-orders");

    } catch (error) {
      console.error("ORDER ERROR:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );

    } finally {
      setLoading(false);
    }
  };

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
            COMPLETE YOUR ORDER
          </span>

          <h2
            className="fw-bold mt-2 mb-2"
            style={{
              color: "#07152f",
              fontSize: "34px",
            }}
          >
            Checkout
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#64716c",
            }}
          >
            Enter your shipping details to place your order.
          </p>

        </div>


        <div className="row justify-content-center">

          <div className="col-lg-7 col-md-9">

            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "18px",
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


              <div className="card-body p-4 p-md-5">

                <div className="d-flex align-items-center mb-4">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#e8f0ed",
                      color: "#2f6657",
                      fontSize: "21px",
                    }}
                  >
                    📍
                  </div>

                  <div>

                    <h5
                      className="fw-bold mb-1"
                      style={{
                        color: "#07152f",
                      }}
                    >
                      Shipping Details
                    </h5>

                    <small
                      style={{
                        color: "#64716c",
                      }}
                    >
                      Where should we deliver your order?
                    </small>

                  </div>

                </div>


                <form onSubmit={handlePlaceOrder}>


                  <div className="mb-4">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: "#07152f",
                      }}
                    >
                      Address
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      required
                      style={{
                        border: "1px solid #d9ddd9",
                        borderRadius: "9px",
                        padding: "11px 13px",
                      }}
                    />

                  </div>


                  <div className="row">

                    <div className="col-md-6 mb-4">

                      <label
                        className="form-label fw-semibold"
                        style={{
                          color: "#07152f",
                        }}
                      >
                        City
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) =>
                          setCity(e.target.value)
                        }
                        required
                        style={{
                          border: "1px solid #d9ddd9",
                          borderRadius: "9px",
                          padding: "11px 13px",
                        }}
                      />

                    </div>


                    <div className="col-md-6 mb-4">

                      <label
                        className="form-label fw-semibold"
                        style={{
                          color: "#07152f",
                        }}
                      >
                        State
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your state"
                        value={state}
                        onChange={(e) =>
                          setState(e.target.value)
                        }
                        required
                        style={{
                          border: "1px solid #d9ddd9",
                          borderRadius: "9px",
                          padding: "11px 13px",
                        }}
                      />

                    </div>

                  </div>


                  <div className="mb-4">

                    <label
                      className="form-label fw-semibold"
                      style={{
                        color: "#07152f",
                      }}
                    >
                      Pincode
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 6-digit pincode"
                      value={pincode}
                      onChange={(e) =>
                        setPincode(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      pattern="[0-9]{6}"
                      maxLength="6"
                      required
                      style={{
                        border: "1px solid #d9ddd9",
                        borderRadius: "9px",
                        padding: "11px 13px",
                      }}
                    />

                    <small
                      className="d-block mt-2"
                      style={{
                        color: "#7a8580",
                      }}
                    >
                      Enter a valid 6-digit delivery pincode.
                    </small>

                  </div>


                  <hr
                    style={{
                      borderColor: "#e5e2d8",
                      marginBottom: "25px",
                    }}
                  />


                  <button
                    type="submit"
                    className="btn w-100 fw-bold"
                    disabled={loading}
                    style={{
                      backgroundColor: loading
                        ? "#b9b5a8"
                        : "#e5b94b",
                      color: "#07152f",
                      border: "none",
                      borderRadius: "9px",
                      padding: "13px",
                      fontSize: "16px",
                    }}
                  >
                    {loading
                      ? "Placing Order..."
                      : "Place Order →"}
                  </button>


                  <div
                    className="text-center mt-4"
                    style={{
                      fontSize: "13px",
                      color: "#7a8580",
                    }}
                  >
                    🔒 Secure & safe checkout
                  </div>

                </form>

              </div>

            </div>



            <div className="text-center mt-4">

              <button
                className="btn btn-sm"
                style={{
                  color: "#2f6657",
                  border: "none",
                  background: "transparent",
                  fontWeight: "600",
                }}
                onClick={() => navigate("/cart")}
              >
                ← Back to Cart
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;