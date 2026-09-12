const { getUser } = require("../services/auth");

async function restrictToLoggeinUserOnly(req, res, next) {

    console.log("========== AUTH ==========");
    console.log("Cookies:", req.cookies);
    console.log("UID:", req.cookies?.uid);

    const userUid = req.cookies?.uid;

    if (!userUid) {
        console.log("❌ NO COOKIE");
        return res.status(401).json({
            message: "Not logged in"
        });
    }

    const user = getUser(userUid);

    console.log("JWT USER:", user);

    if (!user) {
        console.log("❌ INVALID JWT");
        return res.status(401).json({
            message: "Not logged in"
        });
    }

    console.log("✅ USER AUTHENTICATED");

    req.user = user;

    next();
}


async function checkAuth(req, res, next) {

    const userUid = req.cookies?.uid;

    if (!userUid) {
        return next();
    }

    const user = getUser(userUid);

    if (user) {
        req.user = user;
    }

    next();
}


module.exports = {
    restrictToLoggeinUserOnly,
    checkAuth
};