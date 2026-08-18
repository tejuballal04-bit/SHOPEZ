import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", response.data);

      alert("Registration successful! 🎉");

      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 75px)",
        background:
          "linear-gradient(135deg, #faf7ff 0%, #f4edff 50%, #ffffff 100%)",
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">

        <div
          className="row justify-content-center align-items-stretch"
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
          }}
        >

          <div className="col-lg-6 d-none d-lg-block">

            <div
              style={{
                height: "100%",
                minHeight: "620px",
                borderRadius: "28px 0 0 28px",
                background:
                  "linear-gradient(145deg, #8b5cf6, #6d3fe8)",
                padding: "55px 45px",
                position: "relative",
                overflow: "hidden",
                color: "white",
              }}
            >

              <div
                style={{
                  position: "absolute",
                  width: "230px",
                  height: "230px",
                  borderRadius: "50%",
                  backgroundColor:
                    "rgba(255,255,255,0.08)",
                  top: "-80px",
                  right: "-70px",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  backgroundColor:
                    "rgba(255,255,255,0.07)",
                  bottom: "-55px",
                  left: "-55px",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "52px",
                    height: "52px",
                    borderRadius: "15px",
                    backgroundColor:
                      "rgba(255,255,255,0.18)",
                    fontSize: "25px",
                    marginBottom: "25px",
                  }}
                >
                  🛍️
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    letterSpacing: "3px",
                    fontWeight: "600",
                    opacity: 0.85,
                  }}
                >
                  JOIN THE FAMILY
                </div>

                <h1
                  style={{
                    fontSize: "52px",
                    fontWeight: "800",
                    letterSpacing: "-2px",
                    marginTop: "8px",
                    marginBottom: "18px",
                  }}
                >
                  SHOPEZ
                </h1>

                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.7",
                    maxWidth: "390px",
                    opacity: 0.9,
                  }}
                >
                  Create your account
                  <br />
                  and start shopping today.
                </p>

              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "45px",
                  left: "45px",
                  right: "45px",
                  zIndex: 2,
                }}
              >

                <div
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.12)",
                    border:
                      "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "16px",
                    padding: "20px",
                    backdropFilter: "blur(8px)",
                  }}
                >

                  <div className="d-flex align-items-center mb-3">

                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        backgroundColor:
                          "rgba(255,255,255,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "12px",
                        fontSize: "19px",
                      }}
                    >
                      ✨
                    </div>

                    <div>

                      <div
                        style={{
                          fontWeight: "700",
                          fontSize: "14px",
                        }}
                      >
                        Why join SHOPEZ?
                      </div>

                      <div
                        style={{
                          fontSize: "12px",
                          opacity: 0.75,
                        }}
                      >
                        A better way to shop online.
                      </div>

                    </div>

                  </div>

                  <div
                    className="d-flex flex-column gap-2"
                    style={{
                      fontSize: "12px",
                    }}
                  >

                    <div>
                      ✓ Easy &amp; convenient shopping
                    </div>

                    <div>
                      ✓ Track your orders easily
                    </div>

                    <div>
                      ✓ Secure account &amp; checkout
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>



          <div className="col-lg-6">

            <div
              style={{
                height: "100%",
                minHeight: "620px",
                backgroundColor: "#ffffff",
                borderRadius: "0 28px 28px 0",
                padding: "45px 50px",
                boxShadow:
                  "0 20px 50px rgba(89,55,140,0.12)",
                border: "1px solid #eee7f8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >

              <div className="d-lg-none text-center mb-4">

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "58px",
                    height: "58px",
                    borderRadius: "17px",
                    backgroundColor: "#f1e9ff",
                    fontSize: "27px",
                  }}
                >
                  🛍️
                </div>

                <h2
                  className="fw-bold mt-2 mb-0"
                  style={{
                    color: "#8b5cf6",
                  }}
                >
                  SHOPEZ
                </h2>

              </div>


              <div className="mb-4">

                <span
                  style={{
                    color: "#8b5cf6",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                  }}
                >
                  GET STARTED
                </span>

                <h2
                  className="fw-bold mt-2 mb-2"
                  style={{
                    color: "#111018",
                    fontSize: "32px",
                    letterSpacing: "-0.8px",
                  }}
                >
                  Create your account
                </h2>

                <p
                  style={{
                    color: "#777180",
                    fontSize: "14px",
                    marginBottom: 0,
                  }}
                >
                  Join SHOPEZ and make your shopping easier.
                </p>

              </div>


              <form onSubmit={handleRegister}>

                <div className="mb-3">

                  <label
                    className="form-label"
                    style={{
                      color: "#292431",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Full Name
                  </label>

                  <div
                    style={{
                      position: "relative",
                    }}
                  >

                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        fontSize: "16px",
                      }}
                    >
                      👤
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                      style={{
                        borderRadius: "12px",
                        padding:
                          "13px 14px 13px 43px",
                        border:
                          "1px solid #ddd6e8",
                        backgroundColor: "#fcfbff",
                        fontSize: "14px",
                      }}
                    />

                  </div>

                </div>



                <div className="mb-3">

                  <label
                    className="form-label"
                    style={{
                      color: "#292431",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Email Address
                  </label>

                  <div
                    style={{
                      position: "relative",
                    }}
                  >

                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        fontSize: "16px",
                      }}
                    >
                      ✉️
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      style={{
                        borderRadius: "12px",
                        padding:
                          "13px 14px 13px 43px",
                        border:
                          "1px solid #ddd6e8",
                        backgroundColor: "#fcfbff",
                        fontSize: "14px",
                      }}
                    />

                  </div>

                </div>



                <div className="mb-3">

                  <label
                    className="form-label"
                    style={{
                      color: "#292431",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Password
                  </label>

                  <div
                    style={{
                      position: "relative",
                    }}
                  >

                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        fontSize: "16px",
                        zIndex: 2,
                      }}
                    >
                      🔒
                    </span>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      style={{
                        borderRadius: "12px",
                        padding:
                          "13px 48px 13px 43px",
                        border:
                          "1px solid #ddd6e8",
                        backgroundColor: "#fcfbff",
                        fontSize: "14px",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      style={{
                        position: "absolute",
                        right: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        border: "none",
                        background:
                          "transparent",
                        fontSize: "16px",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {showPassword
                        ? "🙈"
                        : "👁️"}
                    </button>

                  </div>

                </div>


                <div className="mb-4">

                  <label
                    className="form-label"
                    style={{
                      color: "#292431",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Confirm Password
                  </label>

                  <div
                    style={{
                      position: "relative",
                    }}
                  >

                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        fontSize: "16px",
                        zIndex: 2,
                      }}
                    >
                      🔐
                    </span>

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      required
                      style={{
                        borderRadius: "12px",
                        padding:
                          "13px 48px 13px 43px",
                        border:
                          "1px solid #ddd6e8",
                        backgroundColor: "#fcfbff",
                        fontSize: "14px",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      style={{
                        position: "absolute",
                        right: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        border: "none",
                        background:
                          "transparent",
                        fontSize: "16px",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {showConfirmPassword
                        ? "🙈"
                        : "👁️"}
                    </button>

                  </div>

                </div>



                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 fw-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b5cf6, #7040e8)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "13px",
                    fontSize: "15px",
                    boxShadow:
                      "0 8px 18px rgba(139,92,246,0.25)",
                  }}
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account →"}
                </button>

              </form>



              <div
                className="d-flex align-items-center my-4"
              >

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#eee7f8",
                    flex: 1,
                  }}
                />

                <span
                  style={{
                    padding: "0 12px",
                    color: "#aaa3b2",
                    fontSize: "12px",
                  }}
                >
                  ALREADY A MEMBER?
                </span>

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#eee7f8",
                    flex: 1,
                  }}
                />

              </div>



              <button
                type="button"
                className="btn w-100 fw-semibold"
                onClick={() =>
                  navigate("/login")
                }
                style={{
                  backgroundColor: "#f5f0ff",
                  color: "#7c4ee8",
                  border:
                    "1px solid #e4d8ff",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "14px",
                }}
              >
                ← Back to Login
              </button>



              <p
                className="text-center mt-4 mb-0"
                style={{
                  color: "#aaa3b2",
                  fontSize: "11px",
                }}
              >
                🛍️ Your shopping, your way.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;