const { ApplicationError } = require("./application-error")
const { HTTP_STATUS } = require("../app-contants/app-constant") 

exports.APIError = class APIError  extends ApplicationError{
    constructor(code = HTTP_STATUS.SERVER_ERROR, message) {
        super(code,message)
    }
}