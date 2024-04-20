require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();

const connectToDatabase = require("./db/dbSetup");
const router = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(cors({credentials: true, origin:"https://mern-auth-client.viditgoel.com"}))
app.use(express.json())

const port = process.env.PORT || 4000;

// Call the database connection function before starting the server
connectToDatabase(process.env.MONGODB_URI).then((success) => {
    if (success) {
        app.listen(port, () => {
            console.log("Listening on localhost port: ", port);
        });
    } else {
        console.log("Error connecting to Server");
        process.exit(1);
    }
});

app.use("/api", router);

