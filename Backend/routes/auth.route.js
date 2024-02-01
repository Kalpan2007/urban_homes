const express = require('express');
const { signup, signin, google } = require('../controllers/auth.controller');
const router = express.Router();

// console.log(signup);
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google)
// console.log(signup);

module.exports =  router;