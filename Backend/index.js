const express = require('express');
const app = express();


app.use(express.json());

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


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running at port no. ${PORT}`)
})