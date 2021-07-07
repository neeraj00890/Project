exports.ApplicationError = class ApplicationError extends Error {
    constructor(code, message) {
        super(message);
        Error.captureStackTrace(this)
        this.code = code;
        this.message = message;
    };
};