const commonUtils = require("../../utils/common-util");
const User = require("../../models/user");
const { BadRequestError } = require("../../error-handlings/bad-request-error");


exports.registerValidators = async (req, res, next)=> {
    req.checkBody('firstName').
    notEmpty().withMessage("First Name is Required")
    .isLength({min: 5}).withMessage("First name should of length 5.");

    req.checkBody('lastName').
    notEmpty().withMessage("Last Name is Required")
    .isLength({min: 5}).withMessage("Last name should of length 5.");

    req.checkBody('email').
    notEmpty().withMessage("Email is Required")
    .isEmail().withMessage("Please enter a valid Email. ")
    .normalizeEmail()
    req.checkBody('role').
    notEmpty().withMessage("Role is Required");

    req.checkBody('password').
    notEmpty().withMessage("First Name is Required");
    
    console.log(req.validationErrors());
    const errors =  req.validationErrors() ? req.validationErrors().map(err => err.msg) : false;
    console.log("Err:", errors);

    if(errors && errors.length > 0) {
        return next(new BadRequestError(undefined, errors.join(", ")));
    } else {
        req.parsedBody = JSON.parse(JSON.stringify(req.body));
        return next();
    }
   
   
    

}


exports.loginValidator = (req, res, next) => {
    req.checkBody("email")
        .notEmpty().withMessage("Email is required.")
    req.checkBody("password")
        .notEmpty().withMessage("password is required.") ;
        const errors =  req.validationErrors() ? req.validationErrors().map(err => err.msg) : false;
    console.log("Err:", errors);

    if(errors && errors.length > 0) {
        return next(new BadRequestError(undefined, errors.join(", ")));
    } else {
        req.parsedBody = JSON.parse(JSON.stringify(req.body));
        return next();
    }   
}