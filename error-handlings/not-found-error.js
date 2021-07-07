const { HTTP_STATUS } = require("../app-contants/app-constant") 
const { ApplicationError } = require("./application-error")
exports.NotFoundError = class NotFoundError  extends ApplicationError{
    constructor(code = HTTP_STATUS.NOT_FOUND, message) {
        super(code,message)
    }
}