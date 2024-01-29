const { User } = require("../models/user.model");
const  bcryptjs  = require('bcryptjs');
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

 exports.signup = async (req,res,next) =>{
    // console.log(req.body);
    const {username, email, password} = req.body;
    console.log(password);
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password: hashedPassword});

    try{
        await newUser.save();
        res.status(201).json("User created successfully...");
        console.log("user added ...")
    }
    catch(error){
        next(error);
        // next(errorHandler(550,"internal issue..."));

    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        console.log(validUser);  // Log the user object to check if it's retrieved correctly

        if (!validUser) {
            return next(errorHandler(404, 'User not found!'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, "Invalid input!"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc; //password is not sending as a response
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}
