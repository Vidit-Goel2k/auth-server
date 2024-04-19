require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();

const connectToDatabase = require("./db/dbSetup");
const router = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(cors({credentials: true, origin:"http://localhost:5173"}))
app.use(express.json())

// Call the database connection function before starting the server
connectToDatabase(process.env.MONGODB_URI).then((success) => {
    if (success) {
        app.listen(5000, () => {
            console.log("Listening on localhost port: 5000");
        });
    } else {
        console.log("Error connecting to Server");
        process.exit(1);
    }
});

app.use("/api", router);

