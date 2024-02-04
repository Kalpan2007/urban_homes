const { Listing } = require("../models/listing.model")

exports.createListing = async (req,res,next) =>{
    try {
        console.log(req.body);
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}