const express = require("express")
const multer = require("multer")
const UploadImage = require("../../controllers/image/add-image")
const RetriveImage = require("../../controllers/image/retrive-image");
const DeleteImage = require("../../controllers/image/delete-image")

/** Initialization */
const upload = multer();


const router = express.Router();
router.post("/add",  upload.single("image"), UploadImage)
router.delete("/delete", DeleteImage)
router.get("/retrive/:image", RetriveImage)

module.exports = router;