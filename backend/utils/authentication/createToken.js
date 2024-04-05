const jwt = require("jsonwebtoken")
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "123";
const createToken = (userId, name, profileImage)=>{
    const payload = {userId: userId, name: name, profileImage, profileImage}
    const token = jwt.sign(payload, SECRET_KEY);
    return token;
}

module.exports = createToken;