const express = require("express");

const {
    handleUserSignUp,
    handleUserLogin
} = require("../controllers/user");

const { checkAuth } = require("../middlewares/auth");

const router = express.Router();


// Show login page
router.get("/login", (req, res) => {
    res.render("login");
});


// Process login form
router.post("/login", handleUserLogin);


// Signup
router.post("/signup", handleUserSignUp);


// Check login status
router.get("/me", checkAuth, (req, res) => {

    if (!req.user) {
        return res.status(401).json({
            loggedIn: false
        });
    }

    return res.json({
        loggedIn: true,
        user: req.user
    });
});


module.exports = router;