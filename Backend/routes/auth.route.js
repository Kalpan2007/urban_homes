const express = require('express');
const { signup, signin } = require('../controllers/auth.controller');
const router = express.Router();

// console.log(signup);
router.post("/signup",signup);
router.post("/signin",signin);
// console.log(signup);

module.exports =  router;