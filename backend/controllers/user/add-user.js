const User = require("../../model/user");
const generateHash = require("../../utils/password/generateHash");
const createToken = require("../../utils/authentication/createToken")

const PasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
const AddUser = async (req, res)=>{
    const signupData = req.body.signupData;
    try{
        if(!PasswordRegex.test(signupData.password)){
            return res.json({message: "password not strong"})
        }
        const {salt, hash} = generateHash(signupData.password);
        const user = await User.create({
            name: signupData.name,
            email: signupData.email,
            profileImage: signupData.profileImage,
            salt: salt,
            hash: hash,
        })
        // console.log("user: ", user)
        const token = createToken(user._id, user.name, user.profileImage);
        return res.json({token: token})
    }catch(err){
        if(err.toString().includes("duplicate key")){
            return res.json({message: "email already exists"})
        }
        console.log("user creation err: ", err)
        return res.json({message: "not-ok"})
    }
}

module.exports = AddUser;