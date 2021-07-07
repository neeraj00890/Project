const path = require("path");
const bcrypt = require("bcryptjs")

exports.pathResolver = path.join(__dirname);
exports.getEncyprtPassword  = async (password) => {
    return await bcrypt.hash(password, 12);
}
exports.isValidPassword  =  (password) => {
    return true;
}

