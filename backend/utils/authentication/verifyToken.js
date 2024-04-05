const jwt = require("jsonwebtoken")
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "123";

const verifyToken = (token)=>{
    try{
        const payload = jwt.verify(token, SECRET_KEY);
    return payload;
    }catch(err){
        console.log("jwt-verify error: ", err);
        return null;
    }
}

module.exports=  verifyToken;