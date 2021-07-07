const express = require("express");
const router  = express.Router();
const User = require("../../models/user");
const upload =  require("../../middlewares/file-upload");
const commonUtils = require("../../utils/common-util");
const validators = require("../../middlewares/validators/home-validators");
const { ERROR_CODE, HTTP_STATUS } = require("../../app-contants/app-constant");
const { BadRequestError } = require("../../error-handlings/bad-request-error")
const { GeneralError } = require("../../error-handlings/general-error");
const { ResponseEntity } = require("../../dtos/response-entiry")
const multer = require("multer");
const { redis } =  require("../../DataBase/redis")
const bcrypt =require("bcryptjs");
 

router.post("/signup", upload.single("image"), validators.registerValidators, async (req, res, next) => {
    try{
        req.body.password = await commonUtils.getEncyprtPassword(req.body.password);
    const isUserExists = await User.exists({ email: req.body.email });
    if(isUserExists) {
        return next(new BadRequestError(undefined, "Email already in use. please pick a different one"));
    }
    if(!req.file) {
        return next(new BadRequestError(undefined, "Please upload profile image."));
    }
    const user = await User.create({ ...req.body, image: req.file.location });
    const response = ResponseEntity.getInstance("User Information",  user);
    return res.status(HTTP_STATUS.RESOURCE_CREATED).send(response);
    } catch(err) {
        return next(new GeneralError(undefined, err.message));  
    }
})

router.post("/login", validators.loginValidator, async (req, res, next)=>{
    try{
        const user = await User.findOne({ email: req.body.email})
    if(!user) {
        return next(new GeneralError(undefined, "Email is not registered"));
    }
    const isLoggedIn = await bcrypt.compare(req.body.password, user.password);
    if(isLoggedIn) {
        const response = ResponseEntity.getInstance("User Information",  user);
        redis.set(user.email.toString(), user, function(err, res){
            console.log(err);
        });
        return res.status(HTTP_STATUS.OK).send(response);
    } else {
        return next(new GeneralError(undefined, "Incorrect password"));
    }
    } catch(err) {
        return next(new GeneralError(undefined, err.message)); 
    }

    

})
router.get("/get-user-details", (req, res, next)=>{
    redis.get("kumar74312@gmail.com", function(err, data){
        console.log(data);
    })
})


module.exports = router;