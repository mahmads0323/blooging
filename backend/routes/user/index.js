const express = require("express");
const AddUser = require("../../controllers/user/add-user");
const ValidateUser = require("../../controllers/user/validate-user");
const UpdateUser = require("../../controllers/user/update-user");
const GetUser = require("../../controllers/user/get-user");
const DeleteUser = require("../../controllers/user/delete-user");


const router = express.Router();

router.post("/signup", AddUser)
router.post("/login", ValidateUser)
router.patch("/", UpdateUser)
router.get("/", GetUser)
router.delete("/", DeleteUser)

module.exports = router;