import express from "express";
import morgan from "morgan";
const PORT = 4000;
const app = express();
const logger = morgan("dev  ");

const home = (req, res) => {
    console.log("I'll respond.");
    return res.send("hello");
};

const login = (req,res) => {
    return res.sed("login");
};

app.use(logger);
app.get("/", home);
app.get("/login", login);

app.listen(PORT, () => console.log(`Go to http://localhost:${PORT}`));