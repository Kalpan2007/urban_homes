const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());


app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("DB connected successfully...")
    })
    .catch((error) => {
        console.log(error);
        console.log("DB connection is facing issue...");
    });

const userRoute = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

app.use("/api/user",userRoute);
app.use("/api/auth",authRouter);

//middleware for handle error
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error...";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running at port no. ${PORT}`)
})