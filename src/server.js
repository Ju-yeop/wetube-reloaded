import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.send("<h1>This course is the best</h1>");
};

const handleAbout = (req, res) => {
    return res.send("<h1>But i didn't understand this assignment exactly.</h1>");
};

const handleContact = (req, res) => {
    return res.send("<h1>So i'm not sure how to do it</h1>");
};

const handleLogin = (req, res) => {
    return res.send("<h1>Does it correct answer?</h1>");
};

app.get("/", handleHome);
app.get("/about", handleAbout);
app.get("/contact", handleContact);
app.get("/login", handleLogin);

const handleListening = () =>
    console.log(`Server listening on port 4000 http://localhost:${PORT}`);
app.listen(PORT, handleListening);
