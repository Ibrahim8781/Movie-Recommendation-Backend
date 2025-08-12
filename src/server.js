require('dotenv').config();

const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const newsRoutes = require("./routes/newsRoutes");
const awardRoutes = require("./routes/awardRoutes");

const PORT = 5000;

connectDb();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/review", reviewRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/news", newsRoutes);
app.use("/award", awardRoutes);

app.listen(PORT, () => {
    console.log("App listenting of port 5000")
});