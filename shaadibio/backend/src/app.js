const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const biodataRoutes = require("./routes/biodataRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const path = require("path");

app.use(cors({
    origin: ['http://localhost:5173', 'https://shaadibio.netlify.app'],
    credentials: true
}));
app.use(express.json());

// Expose the uploads directory to the internet
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
    res.send("bacckend is running");
})
app.use("/api/biodatas",biodataRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
module.exports = app;
