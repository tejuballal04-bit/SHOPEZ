import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);
      console.log("USER:", response.data.user);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "isAdmin",
        response.data.user.isAdmin ? "true" : "false"
      );

      window.dispatchEvent(new Event("login"));

      alert("Login successful! 🎉");

      if (response.data.user.isAdmin === true) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.message ||
          "Login failed"
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
                minHeight: "570px",
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
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  backgroundColor:
                    "rgba(255,255,255,0.08)",
                  top: "-70px",
                  right: "-70px",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  backgroundColor:
                    "rgba(255,255,255,0.07)",
                  bottom: "-50px",
                  left: "-50px",
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
                  WELCOME TO
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
                  Everything you love,
                  <br />
                  all in one place.
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
                    padding: "18px",
                    backdropFilter: "blur(8px)",
                  }}
                >

                  <div className="d-flex align-items-center mb-3">

                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "12px",
                        backgroundColor:
                          "rgba(255,255,255,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "12px",
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
                        Shop with confidence
                      </div>

                      <div
                        style={{
                          fontSize: "12px",
                          opacity: 0.75,
                        }}
                      >
                        Simple. Secure. Convenient.
                      </div>
                    </div>

                  </div>


                  <div className="d-flex gap-2 flex-wrap">

                    <span
                      style={{
                        backgroundColor:
                          "rgba(255,255,255,0.12)",
                        padding: "7px 12px",
                        borderRadius: "20px",
                        fontSize: "11px",
                      }}
                    >
                      🛒 Easy Shopping
                    </span>

                    <span
                      style={{
                        backgroundColor:
                          "rgba(255,255,255,0.12)",
                        padding: "7px 12px",
                        borderRadius: "20px",
                        fontSize: "11px",
                      }}
                    >
                      🔒 Secure
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>



          <div className="col-lg-6">

            <div
              style={{
                height: "100%",
                minHeight: "570px",
                backgroundColor: "#ffffff",
                borderRadius: "0 28px 28px 0",
                padding: "55px 50px",
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
                  WELCOME BACK
                </span>

                <h2
                  className="fw-bold mt-2 mb-2"
                  style={{
                    color: "#111018",
                    fontSize: "32px",
                    letterSpacing: "-0.8px",
                  }}
                >
                  Sign in to your account
                </h2>

                <p
                  style={{
                    color: "#777180",
                    fontSize: "14px",
                    marginBottom: 0,
                  }}
                >
                  Continue your shopping journey with SHOPEZ.
                </p>

              </div>


              <form onSubmit={handleLogin}>


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

                  <div style={{ position: "relative" }}>

                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
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
                        padding: "13px 14px 13px 43px",
                        border:
                          "1px solid #ddd6e8",
                        backgroundColor: "#fcfbff",
                        fontSize: "14px",
                      }}
                    />

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
                    Password
                  </label>

                  <div style={{ position: "relative" }}>

                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
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
                      placeholder="Enter your password"
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
                        setShowPassword(!showPassword)
                      }
                      style={{
                        position: "absolute",
                        right: "13px",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        border: "none",
                        background: "transparent",
                        fontSize: "16px",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
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
                    ? "Signing in..."
                    : "Sign In →"}
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
                  NEW TO SHOPEZ?
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
                  navigate("/register")
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
                Create a New Account
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

export default Login; 