const express = require('express');
const { test, updatedUser } = require('../controllers/user.controller');
const { verifyToken } = require('../utils/verifyUsers');

const router = express.Router();

router.get("/",test);
router.post("/update/:id", verifyToken ,updatedUser);

module.exports =  router;