const express = require('express');
const { signup } = require('../controllers/auth.controller');
const router = express.Router();

console.log(signup);
router.post("/signup",signup);
console.log(signup);

module.exports =  router;