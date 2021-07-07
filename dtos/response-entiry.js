exports.ResponseEntity = class ResponseEntity {
    constructor(data,  message) {
        this.data= data;
        this.message = message;
    }
    static getInstance(message, data) {
        return new ResponseEntity(data, message);
    }
}