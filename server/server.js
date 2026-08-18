const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const connectDB = require("./config/db");


dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
  res.send("SHOPEZ Backend is Running...");
});


module.exports = app;
