const express = require('express');

const signup = require("../controllers/SignupController")
const login = require("../controllers/LoginController")

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello From Router")
})

router.post('/signup', signup)

router.post('/login', login)

module.exports = router