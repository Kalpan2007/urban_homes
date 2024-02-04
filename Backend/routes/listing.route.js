const express = require('express');
const { createListing } = require('../controllers/listing.controller');
const { verifyToken } = require('../utils/verifyUsers');

const router = express.Router();

console.log(createListing);
router.post('/create',verifyToken,createListing);

module.exports =  router;