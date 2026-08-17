import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>

      <section
        style={{
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #f8f6f0 0%, #eef3ef 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-lg-7">

              <span
                className="badge px-3 py-2 mb-3"
                style={{
                  backgroundColor: "#d4a373",
                  color: "#222",
                }}
              >
                WELCOME TO SHOPEZ
              </span>

              <h1
                className="display-3 fw-bold"
                style={{
                  lineHeight: "1.1",
                  color: "#222",
                }}
              >
                Shop Smart.
                <br />
                Shop{" "}
                <span style={{ color: "#2f5d50" }}>
                  SHOPEZ.
                </span>
              </h1>

              <p
                className="lead mt-4"
                style={{
                  color: "#6b6b6b",
                  maxWidth: "600px",
                }}
              >
                Discover products you'll love,
                great prices you'll enjoy,
                and shopping made simple.
              </p>

              <div className="mt-4">

                <Link
                  to="/products"
                  className="btn btn-lg px-4 me-3"
                  style={{
                    backgroundColor: "#2f5d50",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Start Shopping 🛒
                </Link>

                <Link
                  to="/products"
                  className="btn btn-lg px-4"
                  style={{
                    backgroundColor: "#fff",
                    color: "#2f5d50",
                    border: "1px solid #2f5d50",
                  }}
                >
                  Explore Products
                </Link>

              </div>

            </div>


            <div className="col-lg-5 text-center mt-5 mt-lg-0">

              <div
                className="mx-auto"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #ffffff, #d4a373)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 20px 50px rgba(47,93,80,0.15)",
                  overflow: "hidden",
                }}
              >

                <img
                  src="/img/logo.png"
                  alt="SHOPEZ Logo"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                  }}
                />

              </div>

              <div className="mt-3">

                <span
                  className="badge px-3 py-2"
                  style={{
                    backgroundColor: "#2f5d50",
                    color: "#fff",
                  }}
                >
                  Your One-Stop Shopping Destination
                </span>

              </div>

            </div>

          </div>
        </div>
      </section>


      <section className="container py-5">

        <div className="text-center mb-5">

          <span
            className="small fw-semibold"
            style={{ color: "#2f5d50" }}
          >
            SHOP WITH CONFIDENCE
          </span>

          <h2 className="fw-bold mt-2">
            Why Choose SHOPEZ?
          </h2>

          <p className="text-muted">
            Everything you need for a smooth shopping experience.
          </p>

        </div>


        <div className="row g-4">

          <div className="col-md-4">

            <div
              className="card border-0 shadow-sm h-100 text-center p-4"
              style={{
                borderRadius: "14px",
              }}
            >

              <div
                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "70px",
                  height: "70px",
                  fontSize: "30px",
                  backgroundColor: "#e8f0ec",
                }}
              >
                🚚
              </div>

              <h5 className="fw-bold">
                Fast Delivery
              </h5>

              <p className="text-muted mb-0">
                Get your favourite products delivered
                right to your doorstep.
              </p>

            </div>

          </div>


          <div className="col-md-4">

            <div
              className="card border-0 shadow-sm h-100 text-center p-4"
              style={{
                borderRadius: "14px",
              }}
            >

              <div
                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "70px",
                  height: "70px",
                  fontSize: "30px",
                  backgroundColor: "#e8f0ec",
                }}
              >
                🔒
              </div>

              <h5 className="fw-bold">
                Secure Shopping
              </h5>

              <p className="text-muted mb-0">
                Shop with confidence using our
                secure platform.
              </p>

            </div>

          </div>


          <div className="col-md-4">

            <div
              className="card border-0 shadow-sm h-100 text-center p-4"
              style={{
                borderRadius: "14px",
              }}
            >

              <div
                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "70px",
                  height: "70px",
                  fontSize: "30px",
                  backgroundColor: "#e8f0ec",
                }}
              >
                💰
              </div>

              <h5 className="fw-bold">
                Great Prices
              </h5>

              <p className="text-muted mb-0">
                Find quality products at prices
                you'll love.
              </p>

            </div>

          </div>

        </div>

      </section>


      <section
        className="py-5"
        style={{
          backgroundColor: "#f0eee7",
        }}
      >

        <div className="container">

          <div className="text-center mb-4">

            <span
              className="small fw-semibold"
              style={{ color: "#2f5d50" }}
            >
              FIND YOUR FAVOURITES
            </span>

            <h2 className="fw-bold mt-2">
              Explore & Shop 🛍️
            </h2>

          </div>


          <div className="row g-4">

            <div className="col-md-4">

              <Link
                to="/products"
                className="text-decoration-none"
              >

                <div
                  className="bg-white shadow-sm rounded p-4 text-center h-100"
                  style={{
                    borderRadius: "14px",
                    transition: "0.3s",
                  }}
                >

                  <div style={{ fontSize: "50px" }}>
                    ⌚
                  </div>

                  <h5
                    className="mt-3 fw-bold"
                    style={{ color: "#2f5d50" }}
                  >
                    Electronics
                  </h5>

                  <p className="text-muted mb-0">
                    Discover smart gadgets & accessories
                  </p>

                </div>

              </Link>

            </div>


            <div className="col-md-4">

              <Link
                to="/products"
                className="text-decoration-none"
              >

                <div
                  className="bg-white shadow-sm rounded p-4 text-center h-100"
                  style={{
                    borderRadius: "14px",
                  }}
                >

                  <div style={{ fontSize: "50px" }}>
                    🎧
                  </div>

                  <h5
                    className="mt-3 fw-bold"
                    style={{ color: "#2f5d50" }}
                  >
                    Accessories
                  </h5>

                  <p className="text-muted mb-0">
                    Find useful products for everyday life
                  </p>

                </div>

              </Link>

            </div>


            <div className="col-md-4">

              <Link
                to="/products"
                className="text-decoration-none"
              >

                <div
                  className="bg-white shadow-sm rounded p-4 text-center h-100"
                  style={{
                    borderRadius: "14px",
                  }}
                >

                  <div style={{ fontSize: "50px" }}>
                    ✨
                  </div>

                  <h5
                    className="mt-3 fw-bold"
                    style={{ color: "#2f5d50" }}
                  >
                    New Arrivals
                  </h5>

                  <p className="text-muted mb-0">
                    Check out what's new at SHOPEZ
                  </p>

                </div>

              </Link>

            </div>

          </div>

        </div>

      </section>


      <section className="container py-5">

        <div
          className="rounded-4 p-5 text-center"
          style={{
            backgroundColor: "#2f5d50",
            color: "#fff",
          }}
        >

          <div style={{ fontSize: "45px" }}>
            🛒
          </div>

          <h2
            className="fw-bold mt-2"
            style={{ color: "#fff" }}
          >
            Your next favourite product is waiting.
          </h2>

          <p style={{ color: "#e8f0ec" }}>
            Start exploring SHOPEZ today.
          </p>

          <Link
            to="/products"
            className="btn btn-lg px-5 mt-2"
            style={{
              backgroundColor: "#d4a373",
              color: "#222",
              border: "none",
              fontWeight: "600",
            }}
          >
            Shop Now →
          </Link>

        </div>

      </section>


      <footer
        className="text-center py-4"
        style={{
          backgroundColor: "#24483e",
          color: "#fff",
        }}
      >

        <h5 className="fw-bold">
          SHOPEZ 🛍️
        </h5>

        <p
          className="mb-1"
          style={{ color: "#d8e3de" }}
        >
          Your one-stop online shopping store
        </p>

        <small style={{ color: "#b8c9c2" }}>
          © 2026 SHOPEZ. All rights reserved.
        </small>

      </footer>

    </div>
  );
}

export default Home;