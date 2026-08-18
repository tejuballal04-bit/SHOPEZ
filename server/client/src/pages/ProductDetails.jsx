import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to add products to cart.");
        navigate("/login");
        return;
      }

      const response = await api.post(
        "/cart",
        {
          product: product._id,
          quantity: quantity,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Product added to cart! 🛒");

      navigate("/cart");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "70vh",
          backgroundColor: "#faf9f5",
        }}
      >
        <div className="text-center">

          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#2f5d50",
            }}
          ></div>

          <p className="text-muted mt-3">
            Loading product...
          </p>

        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className="container text-center"
        style={{
          paddingTop: "100px",
          minHeight: "70vh",
        }}
      >
        <div style={{ fontSize: "60px" }}>
          😕
        </div>

        <h4 className="mt-3">
          {error || "Product not found"}
        </h4>

        <button
          className="btn mt-3"
          style={{
            backgroundColor: "#2f5d50",
            color: "#fff",
            border: "none",
          }}
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "80vh",
      }}
    >


      <button
        className="btn mb-4"
        style={{
          border: "1px solid #2f5d50",
          color: "#2f5d50",
          backgroundColor: "transparent",
          borderRadius: "8px",
        }}
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>


      <div className="row g-5 align-items-center">


        <div className="col-lg-6">

          <div
            className="shadow-sm overflow-hidden"
            style={{
              backgroundColor: "#f0eee7",
              borderRadius: "18px",
              border: "1px solid #e5e1d8",
            }}
          >

            <img
              src={
                product.image ||
                "https://via.placeholder.com/600x500?text=No+Image"
              }
              alt={product.name}
              className="w-100"
              style={{
                height: "500px",
                objectFit: "cover",
              }}
            />

          </div>

        </div>


        <div className="col-lg-6">

          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor: "#e8f0ec",
              color: "#2f5d50",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {product.category}
          </span>


          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: "1.2",
              color: "#18201d",
            }}
          >
            {product.name}
          </h1>


          <p
            className="text-muted mb-4"
            style={{
              fontSize: "16px",
              lineHeight: "1.7",
              maxWidth: "600px",
            }}
          >
            {product.description}
          </p>


          <div className="mb-3">

            <span
              className="fw-bold"
              style={{
                fontSize: "30px",
                color: "#2f5d50",
              }}
            >
              ₹{product.price}
            </span>

          </div>

          <div className="mb-4">

            {product.stock > 0 ? (

              <span
                className="badge px-3 py-2"
                style={{
                  backgroundColor: "#e8f0ec",
                  color: "#2f5d50",
                  fontWeight: "500",
                }}
              >
                ✓ In Stock — {product.stock} available
              </span>

            ) : (

              <span className="badge bg-danger px-3 py-2">
                Out of Stock
              </span>

            )}

          </div>


          <hr
            style={{
              borderColor: "#e5e1d8",
            }}
          />

          {product.stock > 0 && (

            <div className="mb-4">

              <label className="fw-semibold mb-2 d-block">
                Quantity
              </label>

              <div className="d-flex align-items-center">


                <button
                  type="button"
                  className="btn"
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #2f5d50",
                    color: "#2f5d50",
                    backgroundColor: "#fff",
                    fontSize: "18px",
                  }}
                  onClick={handleDecrease}
                  disabled={quantity === 1}
                >
                  −
                </button>


                <span
                  className="fw-bold mx-4"
                  style={{
                    fontSize: "18px",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </span>


                <button
                  type="button"
                  className="btn"
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #2f5d50",
                    color: "#2f5d50",
                    backgroundColor: "#fff",
                    fontSize: "18px",
                  }}
                  onClick={handleIncrease}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>

              </div>

            </div>

          )}


          <button
            className="btn btn-lg w-100 fw-bold"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            style={{
              backgroundColor:
                product.stock > 0
                  ? "#2f5d50"
                  : "#6c757d",
              color: "#fff",
              border: "none",
              padding: "13px",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          >
            {product.stock <= 0
              ? "Out of Stock"
              : "Add to Cart 🛒"}
          </button>


          <div className="row mt-4 g-3">

            <div className="col-4">

              <div
                className="text-center p-3"
                style={{
                  backgroundColor: "#f4f2eb",
                  borderRadius: "12px",
                  height: "100%",
                }}
              >

                <div
                  style={{
                    fontSize: "22px",
                  }}
                >
                  🚚
                </div>

                <small
                  style={{
                    color: "#59635f",
                  }}
                >
                  Fast Delivery
                </small>

              </div>

            </div>


            <div className="col-4">

              <div
                className="text-center p-3"
                style={{
                  backgroundColor: "#f4f2eb",
                  borderRadius: "12px",
                  height: "100%",
                }}
              >

                <div
                  style={{
                    fontSize: "22px",
                  }}
                >
                  🔒
                </div>

                <small
                  style={{
                    color: "#59635f",
                  }}
                >
                  Secure Shopping
                </small>

              </div>

            </div>


            <div className="col-4">

              <div
                className="text-center p-3"
                style={{
                  backgroundColor: "#f4f2eb",
                  borderRadius: "12px",
                  height: "100%",
                }}
              >

                <div
                  style={{
                    fontSize: "22px",
                  }}
                >
                  ⭐
                </div>

                <small
                  style={{
                    color: "#59635f",
                  }}
                >
                  Quality Products
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;