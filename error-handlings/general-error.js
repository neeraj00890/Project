const { HTTP_STATUS } = require("../app-contants/app-constant") 
const { ApplicationError } = require("./application-error")

exports.GeneralError = class GeneralError  extends ApplicationError{
    constructor(code = HTTP_STATUS.NOT_ACCEPTABLE, message) {
        super(code,message)
    }
}