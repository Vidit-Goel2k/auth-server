const express = require('express');

const app = express();


app.use("/api", (req, res, next) => {
    res.send("Hello World");
});

app.listen(5000, () => {
    console.log("Listening on localhost port: 5000");
});
