const { User } = require("../models/user.model");
const { errorHandler } = require("../utils/error");
const bcryptjs = require('bcryptjs');

 exports.test = (req,res) => {
    res.send('This is a test api route...');
}

exports.updatedUser = async (req, res, next) => {
    console.log(req.body);
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"));

    try {
        if (req.body.password) {
            // Only hash the password if it is present in the request body
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    console.log(req.body);
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account'));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token'); // Add quotes around 'access_token'
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
};

