const crypto = require("crypto");

const verifyHash = (password, salt, hashToVerify)=>{
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === hashToVerify
}

module.exports = verifyHash