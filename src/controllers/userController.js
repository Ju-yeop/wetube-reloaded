import User from "../models/User";
import bcrypt from "bcrypt";

export const getjoin = (req, res) => 
    res.render("join",{pageTitle: "Join"});
export const postjoin = async (req, res) => {
    const {name, username, email, password, password2, location} = req.body;
    if(password !== password2){
        return res.status(400).render("join",{pageTitle: "Join", errorMessage: "Password confirmation does not match."});
    }
    const exists = await User.exists({$or: [{username}, {email}]});
    if(exists){
        return res.status(400).render("join",{pageTitle: "Join", errorMessage: "This username/email is already taken."});
    }
    try{
        await User.create({
            name, 
            username, 
            email, 
            password, 
            location,
        });
        return res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join", {pageTitle:"join", errorMessage: error.message});
    }
};
export const getlogin = (req, res) => res.render("login", {pageTitle: "Login"});

export const postlogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res
        .status(400)
        .render("login", {
        pageTitle:"Login", 
        errorMessage:"An account with this username does not exists."
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res
        .status(400)
        .render("login", {
        pageTitle:"Login", 
        errorMessage: "Wrong password"
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See Use");