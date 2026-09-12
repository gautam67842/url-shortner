const { getUser } = require("../services/auth");

async function restrictToLoggeinUserOnly(req, res, next) {

    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.status(401).json({
            message: "Not logged in"
        });
    }

    const user = getUser(userUid);

    if (!user) {
        return res.status(401).json({
            message: "Not logged in"
        });
    }

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