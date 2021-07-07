const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3');
const validators = require("../middlewares/validators/home-validators")
const commonUtils = require("../utils/common-util");
const User = require("../models/user")
const { ApplicationError } = require("../error-handlings/application-error");
const { ERROR_CODE } = require("../app-contants/app-constant")



aws.config.update({
    secretAccessKey: "jc7rzmTamJAdvuqZEs9jgNR2duQXydo8Ni/jDCer",
    accessKeyId:"AKIAI64COJON4COB6H5Q",
    region:"us-east-2"
})
const s3 = new aws.S3({ /* ... */ })
const  fileFilter = async (req, file, cb) => {
  let isValidRequest  = commonUtils.isValidPassword(req.body.password);
  isValidRequest = ! await User.exists({ email: req.body.email });
  if(isValidRequest) {
    cb(null, true);
} else {
  console.log("ERROR OC")
  cb(new ApplicationError(ERROR_CODE.VALIDATION_FAILED, "Validation failed"), false);
}
}
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'images-bucket-1', 
      acl: "public-read-write", 
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      },
    }),
  })
module.exports = upload