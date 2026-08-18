import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    let result = [...products];

    if (search.trim() !== "") {
      result = result.filter(
        (product) =>
          product.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [search, category, sort, products]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
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
            Loading products...
          </p>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">

        <div
          className="card border-0 shadow-sm p-5"
          style={{ borderRadius: "14px" }}
        >
          <div style={{ fontSize: "50px" }}>
            ⚠️
          </div>

          <h5 className="mt-3">
            {error}
          </h5>

          <p className="text-muted mb-0">
            Please try again later.
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <div className="text-center mb-5">

        <span
          className="small fw-semibold"
          style={{ color: "#2f5d50" }}
        >
          DISCOVER OUR COLLECTION
        </span>

        <h2 className="fw-bold mt-2">
          Our Products
        </h2>

        <p className="text-muted">
          Find your favourite products at great prices.
        </p>

      </div>


      <div
        className="card border-0 shadow-sm p-4 mb-5"
        style={{
          borderRadius: "14px",
          backgroundColor: "#ffffff",
        }}
      >

        <div className="row">

          <div className="col-md-5 mb-3 mb-md-0">

            <label className="form-label fw-semibold">
              Search Products
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="col-md-3 mb-3 mb-md-0">

            <label className="form-label fw-semibold">
              Category
            </label>

            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}

            </select>

          </div>

          <div className="col-md-4">

            <label className="form-label fw-semibold">
              Sort By
            </label>

            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >

              <option value="">
                Sort Products
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>

            </select>

          </div>

        </div>

      </div>


      <div className="d-flex justify-content-between align-items-center mb-4">

        <h5 className="fw-bold mb-0">
          Products
        </h5>

        <span className="text-muted">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} found
        </span>

      </div>


      {filteredProducts.length === 0 ? (

        <div className="text-center mt-5 mb-5">

          <div style={{ fontSize: "60px" }}>
            🔍
          </div>

          <h5 className="mt-3">
            No products found
          </h5>

          <p className="text-muted">
            Try another search or category.
          </p>

          <button
            className="btn"
            style={{
              backgroundColor: "#2f5d50",
              color: "#fff",
            }}
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("");
            }}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="row">

          {filteredProducts.map((product) => (

            <div
              className="col-md-6 col-lg-4 mb-4"
              key={product._id}
            >

              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  overflow: "hidden",
                  borderRadius: "14px",
                  transition: "transform 0.2s ease",
                }}
              >


                <div
                  style={{
                    height: "250px",
                    overflow: "hidden",
                    backgroundColor: "#f0eee7",
                  }}
                >

                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/300x250?text=No+Image"
                    }
                    className="w-100 h-100"
                    alt={product.name}
                    style={{
                      objectFit: "cover",
                    }}
                  />

                </div>


                <div className="card-body d-flex flex-column">


                  <div className="mb-2">

                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#e8f0ec",
                        color: "#2f5d50",
                        fontWeight: "500",
                      }}
                    >
                      {product.category}
                    </span>

                  </div>



                  <h5 className="card-title fw-bold">
                    {product.name}
                  </h5>


                  <p
                    className="card-text text-muted"
                    style={{
                      minHeight: "48px",
                    }}
                  >
                    {product.description}
                  </p>



                  <h5
                    className="fw-bold"
                    style={{
                      color: "#2f5d50",
                    }}
                  >
                    ₹{product.price}
                  </h5>



                  <div className="mb-3">

                    {product.stock > 0 ? (

                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#e8f0ec",
                          color: "#2f5d50",
                        }}
                      >
                        ✓ In Stock ({product.stock})
                      </span>

                    ) : (

                      <span className="badge bg-danger">
                        Out of Stock
                      </span>

                    )}

                  </div>


                  <Link
                    to={`/products/${product._id}`}
                    className="btn mt-auto"
                    style={
                      product.stock > 0
                        ? {
                            backgroundColor: "#2f5d50",
                            color: "#fff",
                            border: "none",
                          }
                        : {
                            color: "#6b6b6b",
                            border: "1px solid #bdbdbd",
                          }
                    }
                  >

                    {product.stock > 0
                      ? "View Details →"
                      : "View Product"}

                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Products;