const express = require('express');

const signup = require("../controllers/SignupController")

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello From Router")
})

router.post('/signup', signup)

module.exports = router