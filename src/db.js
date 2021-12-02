import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,});

const db = mongoose.connection

const handeleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open",handeleOpen);
