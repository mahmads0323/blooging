const User = require("../../model/user");
const verifyToken = require("../../utils/authentication/verifyToken");


const GetUser = async (req, res)=>{
    const userToken = req.cookies.userToken;
    // console.log("userToken: ", userToken)
    if(!userToken){
        return res.json({message: "not authnticated"})
    }
    try{
        const payload = verifyToken(userToken);
        // console.log("payload: ", payload)
        if(!payload){
            return res.json({message: "invalid token"})
        }
        const userId = payload.userId;
        const userData = await User.findById(userId);
        if(!userData){
            return res.json({message: "no user found"})
        }
        const data = {
            name: userData.name,
            email: userData.email,
            profileImage: userData.profileImage,
        }
        return res.json({data: data})
    }catch(err){
        return res.json({message: "cannot get user"})
    }
}

module.exports = GetUser;