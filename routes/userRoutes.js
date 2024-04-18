const express = require('express');

const signup = require("../controllers/SignupController")
const login = require("../controllers/LoginController");
const verifyToken = require("../middlewares/VerifyToken")

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello From Router")
})

router.post('/signup', signup)

router.post('/login', login)

router.get('/user', verifyToken)

module.exports = router