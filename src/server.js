import express from "express";

const PORT = 4000;
const app = express();
const date = new Date();
const today = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;

const URLlogger = (req, res, next) => {
    console.log(`Path: ${req.path}`);
    next();
};

const Timelogger = (req, res, next) => {
    console.log(`Time: ${today}`);
    next();
};

const Securitylogger = (req, res, next) => {
    if(req.protocol === "https"){
        console.log("Secure");
    }else{
        console.log("Insecure ❌");
    }
    next();
};

const Protectormiddleware = (req, res, next) => {
    const URL = req.url;
    if(URL === "/protected"){
        return res.end();
    }
    next();
}

app.use(URLlogger, Timelogger, Securitylogger, Protectormiddleware);
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

app.listen(PORT, handleListen => console.log(`Go to http://localhost:${PORT}`));