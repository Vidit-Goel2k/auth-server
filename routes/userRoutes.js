const express = require('express');

const signup = require("../controllers/SignupController")
const login = require("../controllers/LoginController");
const verifyToken = require("../middlewares/VerifyToken");
const refreshToken = require("../middlewares/RefreshToken");
const getUserInfo = require('../middlewares/GetUser');

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello From Router")
})

router.post('/signup', signup)

router.post('/login', login)

router.get('/user', verifyToken, getUserInfo)

router.get('/refresh', refreshToken, verifyToken, getUserInfo)

module.exports = router