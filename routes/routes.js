const express = require("express");
const app = new express();
const homeController = require("../controllers/home/home-controller");
const emailController = require("../controllers/home/email-template-controller");
require("../crons/cron")();
const  { HTTP_STATUS } = require("../app-contants/app-constant");
const expressValidator = require('express-validator');
const cors = require("cors");


app.use(expressValidator())
app.use(cors());

app.use("/api/v1/user",  homeController)
app.use("/api/v1/email",  emailController)

app.use((err, req, res, next)=> {
    
        res.status(err.code).send({message: err.message, code: err.code});
    
})


module.exports = app;