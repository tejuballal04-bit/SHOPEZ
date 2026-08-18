import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image || "");
    setStock(product.stock);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearForm = () => {
    setEditingProduct(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage("");
    setStock("");
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/products",
        {
          name,
          description,
          price: Number(price),
          category,
          image,
          stock: Number(stock),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Product added successfully! 🎉");

      clearForm();
      fetchProducts();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/products/${editingProduct._id}`,
        {
          name,
          description,
          price: Number(price),
          category,
          image,
          stock: Number(stock),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Product updated successfully! ✨");

      clearForm();
      fetchProducts();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product deleted successfully!");

      fetchProducts();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
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
              color: "#2f6657",
            }}
          ></div>

          <p className="mt-3 text-muted">
            Loading products...
          </p>
        </div>
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

      <div className="container py-5">

        <button
          className="btn mb-4"
          onClick={() => navigate("/admin")}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            borderRadius: "8px",
            padding: "10px 18px",
            border: "none",
          }}
        >
          ← Back to Dashboard
        </button>


        <div className="mb-5">

          <span
            style={{
              color: "#c38b00",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            ADMIN PANEL
          </span>

          <h1
            className="fw-bold mt-2 mb-2"
            style={{
              color: "#111827",
            }}
          >
            Manage Products
          </h1>

          <p
            className="text-muted mb-0"
            style={{
              fontSize: "15px",
            }}
          >
            Add, edit and manage your SHOPEZ products.
          </p>

        </div>


        <div
          className="card border-0 shadow-sm mb-5"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              height: "5px",
              backgroundColor: "#eab308",
            }}
          ></div>

          <div className="card-body p-4 p-md-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h3
                  className="fw-bold mb-1"
                  style={{
                    color: "#111827",
                  }}
                >
                  {editingProduct
                    ? "Edit Product ✏️"
                    : "Add New Product 🛍️"}
                </h3>

                <p className="text-muted mb-0">
                  {editingProduct
                    ? "Update product information"
                    : "Add a new product to your store"}
                </p>

              </div>

            </div>


            <form
              onSubmit={
                editingProduct
                  ? handleUpdateProduct
                  : handleAddProduct
              }
            >

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Product Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                    style={{
                      borderRadius: "8px",
                      padding: "11px",
                    }}
                  />

                </div>


                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Category
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Electronics"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    required
                    style={{
                      borderRadius: "8px",
                      padding: "11px",
                    }}
                  />

                </div>


                <div className="col-12 mb-3">

                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    required
                    style={{
                      borderRadius: "8px",
                      padding: "11px",
                    }}
                  />

                </div>


                <div className="col-md-4 mb-3">

                  <label className="form-label fw-semibold">
                    Price
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      ₹
                    </span>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                      required
                      min="0"
                    />

                  </div>

                </div>


                <div className="col-md-4 mb-3">

                  <label className="form-label fw-semibold">
                    Stock
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter stock"
                    value={stock}
                    onChange={(e) =>
                      setStock(e.target.value)
                    }
                    required
                    min="0"
                    style={{
                      borderRadius: "8px",
                      padding: "11px",
                    }}
                  />

                </div>


                <div className="col-md-4 mb-3">

                  <label className="form-label fw-semibold">
                    Image URL
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) =>
                      setImage(e.target.value)
                    }
                    style={{
                      borderRadius: "8px",
                      padding: "11px",
                    }}
                  />

                </div>

              </div>


              <div className="mt-3">

                <button
                  type="submit"
                  className="btn fw-semibold me-2"
                  style={{
                    backgroundColor: "#2f6657",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "11px 22px",
                  }}
                >
                  {editingProduct
                    ? "✓ Update Product"
                    : "+ Add Product"}
                </button>


                {editingProduct && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={clearForm}
                    style={{
                      borderRadius: "8px",
                      padding: "11px 22px",
                    }}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

          </div>
        </div>


        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3
              className="fw-bold mb-1"
              style={{
                color: "#111827",
              }}
            >
              All Products
            </h3>

            <p className="text-muted mb-0">
              {products.length} products available
            </p>

          </div>

          <span
            className="badge"
            style={{
              backgroundColor: "#fff3cd",
              color: "#856404",
              padding: "10px 14px",
              borderRadius: "20px",
            }}
          >
            {products.length} Items
          </span>

        </div>


        {products.length === 0 ? (

          <div
            className="text-center p-5 bg-white shadow-sm"
            style={{
              borderRadius: "16px",
            }}
          >

            <div style={{ fontSize: "50px" }}>
              🛍️
            </div>

            <h5 className="mt-3">
              No products found
            </h5>

            <p className="text-muted">
              Add your first product above.
            </p>

          </div>

        ) : (

          <div className="row">

            {products.map((product) => (

              <div
                className="col-md-6 col-lg-4 mb-4"
                key={product._id}
              >

                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >

                  <div
                    style={{
                      height: "210px",
                      backgroundColor: "#f1f1f1",
                      overflow: "hidden",
                    }}
                  >

                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/400x250?text=No+Image"
                      }
                      alt={product.name}
                      className="w-100 h-100"
                      style={{
                        objectFit: "cover",
                      }}
                    />

                  </div>


                  <div className="card-body d-flex flex-column p-4">

                    <div className="mb-2">

                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#e8f1ee",
                          color: "#2f6657",
                          borderRadius: "20px",
                          padding: "7px 12px",
                        }}
                      >
                        {product.category}
                      </span>

                    </div>


                    <h5
                      className="fw-bold mb-2"
                      style={{
                        color: "#111827",
                      }}
                    >
                      {product.name}
                    </h5>


                    <p
                      className="text-muted"
                      style={{
                        minHeight: "48px",
                        fontSize: "14px",
                      }}
                    >
                      {product.description}
                    </p>


                    <h5
                      className="fw-bold mb-3"
                      style={{
                        color: "#2f6657",
                      }}
                    >
                      ₹{product.price}
                    </h5>


                    <div className="mb-4">

                      {product.stock > 0 ? (

                        <span
                          className="badge"
                          style={{
                            backgroundColor: "#e8f1ee",
                            color: "#198754",
                            padding: "7px 10px",
                            borderRadius: "20px",
                          }}
                        >
                          ✓ In Stock ({product.stock})
                        </span>

                      ) : (

                        <span
                          className="badge bg-danger"
                          style={{
                            padding: "7px 10px",
                            borderRadius: "20px",
                          }}
                        >
                          Out of Stock
                        </span>

                      )}

                    </div>


                    <div className="mt-auto d-flex gap-2">

                      <button
                        className="btn flex-fill fw-semibold"
                        onClick={() =>
                          handleEditClick(product)
                        }
                        style={{
                          backgroundColor: "#f5b800",
                          color: "#111",
                          border: "none",
                          borderRadius: "8px",
                          padding: "9px",
                        }}
                      >
                        ✏️ Edit
                      </button>


                      <button
                        className="btn btn-outline-danger flex-fill fw-semibold"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        style={{
                          borderRadius: "8px",
                          padding: "9px",
                        }}
                      >
                        🗑️ Delete
                      </button>

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

export default AdminProducts;