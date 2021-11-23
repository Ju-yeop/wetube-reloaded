import "./db";
import "./models/Video";
import app from "./server"

const PORT = 4000;
app.listen(PORT, () => console.log(`Go to http://localhost:${PORT}`));