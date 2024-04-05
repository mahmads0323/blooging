const Blog = require("../../model/blog");
const User = require("../../model/user");
const verifyToken = require("../../utils/authentication/verifyToken");

const DeleteUser = async (req, res) => {
  const userToken = req.cookies.userToken;
  if (!userToken) {
    return res.json({ message: "invalid user token" });
  }
  const payload = verifyToken(userToken);
  const userId = payload.userId;
  if (!userId) {
    return res.json({ message: "invalid user id" });
  }
  try {
    const user = await User.findByIdAndDelete(userId);
    // console.log("user: ", user)
    return res.json({ message: "user deleted success" });
  } catch (err) {
    return res.json({ message: "error in deleting user" + err });
  }
};

module.exports = DeleteUser;
