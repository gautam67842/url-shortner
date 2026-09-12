const User = require("../models/user");
const {v4 : uuidv4} = require("uuid");
const { setUser } = require("../services/auth");


async function handleUserSignUp(req, res) {

    const {name , email , password} = req.body;

    await User.create({
        name,
        email,
        password,
    })
 
    return res.status(200).redirect("/");
}

async function handleUserLogin(req, res) {

    const {email , password} = req.body;

    const user = await User.findOne({
        email,
        password
    })

    if(!user){
        return res.render("login" , {err : "password or email incorrect"});
    }

    const sessionID = setUser(user);

    res.cookie("uid", sessionID, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
});
 
    return res.redirect("https://url-shortner-1-sum6.onrender.com");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}