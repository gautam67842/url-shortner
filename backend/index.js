const express = require("express");
const mongoose = require("mongoose");
const urlRroute = require("./routes/url");
const path = require("path");
const staticRouter = require("./routes/staticrouter");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {
    restrictToLoggeinUserOnly,
    checkAuth
} = require("./middlewares/auth");

const cors = require("cors");

const PORT = 5000;

const app = express();


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(`mongo error : ${err}`));


// EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


// CORS
app.use(cors({
    origin: "https://url-shortner-1-sum6.onrender.com",
    credentials: true
}));


// Routes

// React sends POST request here
// User must be logged in
app.use("/url",  urlRroute);


// Backend/EJS pages
app.use("/", checkAuth, staticRouter);


// Login/signup routes
app.use("/user", userRouter);


app.listen(PORT, () => {
    console.log("server started at port", PORT);
});