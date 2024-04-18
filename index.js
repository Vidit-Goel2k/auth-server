require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./db/dbSetup");

const app = express();

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

app.use("/api", (req, res, next) => {
	res.send("Hello Vidit");
});

