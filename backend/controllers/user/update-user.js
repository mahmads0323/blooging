const User = require("../../model/user");
const verifyToken= require("../../utils/authentication/verifyToken");
const DeleteImage = require("../image/delete-image");
const DeleteImageByPaths = require("../image/delete-imageByPaths");

const UpdateUser = async(req, res)=>{
    const userData = req.body.userData;
    const userToken = req.cookies.userToken;
    let dataToBeUpdate = {};
    try{
        if(userData.name){
            dataToBeUpdate = {...dataToBeUpdate, name: userData.name}
        }
        if(userData.email){
            dataToBeUpdate = {...dataToBeUpdate, email: userData.email}
        }
        if(userData.profileImage){
            dataToBeUpdate = {...dataToBeUpdate, profileImage: userData.profileImage}
        }
    }catch(err){
        console.log("user data error: ", err)
        return res.json({message: "user data error"})
    }
    if(!userToken){
        return res.json({message: "not authnticated"})
    }
    try{
        const payload = verifyToken(userToken);
        if(!payload){
            return res.json({message: "invalid token"})
        }
        const userId = payload.userId;
        const previousData = await User.findById(userId);
        if(!previousData){
            return res.json({message: "no user found"})
        }
        // deleting previous image
        if(dataToBeUpdate.profileImage){
            await DeleteImageByPaths( [previousData.profileImage]);
        }
        //
        const updatedData = await User.findByIdAndUpdate(userId, {
            name: previousData.name,
            email: previousData.email,
            profileImage: previousData.profileImage,
            ...dataToBeUpdate,
        })

        console.log("updatedData: ", updatedData)
    }catch(err){
        console.log("update-failed: ", err)
        return res.json({message: "update-failed"})
    }
    console.log("body: ", userData)
    console.log("userToken: ", userToken)
    return res.json({message: "ok"})
}

module.exports = UpdateUser;