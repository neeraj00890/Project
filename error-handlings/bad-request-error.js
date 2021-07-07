const { ApplicationError } = require("./application-error")
const { HTTP_STATUS } = require("../app-contants/app-constant") 

exports.BadRequestError = class BadRequestError  extends ApplicationError{
    constructor(code = HTTP_STATUS.BAD_REQUEST, message) {
        super(code,message)
    }
}