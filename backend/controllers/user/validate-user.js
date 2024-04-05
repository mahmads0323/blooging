const User = require("../../model/user");
const createToken = require("../../utils/authentication/createToken");
const verifyHash = require("../../utils/password/verifyHash");

const ValidateUser = async(req, res)=>{
    const loginData = req.body.loginData;
    try{
        const user = await User.findOne({email: loginData.email});
        if(!user){
            return res.json({message: "email not found"})
        }
        const passwordVerified = verifyHash(loginData.password, user.salt, user.hash);
        if(!passwordVerified){
            return res.json({message: "password not matched"})
        }
        const token = createToken(user._id, user.name, user.profileImage);
        return res.json({token: token})
    }catch(err){
        return res.json({message: "authenticaion error"});
    }
}

module.exports = ValidateUser;