const express = require('express');
const app = express();

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running at port no. ${PORT}`)
})

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("DB connected successfully...")
    })
    .catch((error) => {
        console.log(error);
        console.log("DB connection is facing issue...");
    })