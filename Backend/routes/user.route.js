const express = require('express');
const { test, updatedUser, deleteUser, getUserListing } = require('../controllers/user.controller');
const { verifyToken } = require('../utils/verifyUsers');

const router = express.Router();

router.get("/",test);
router.post("/update/:id", verifyToken ,updatedUser);
router.delete("/delete/:id", verifyToken ,deleteUser);
router.get("/listings/:id", verifyToken ,getUserListing);

module.exports =  router;