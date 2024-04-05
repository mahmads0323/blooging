const fs = require("fs");

const IMAGES_PATH = "./uploads/";
const STORED_IMAGE_PATH = "http://localhost:8000/images/retrive/";
const IMAGE_EXTENSION_REGEX = RegExp(/\.(png|jpeg|jpg|gif)$/gi);

const getLastMatchingExtension = (imageName) => {
  // console.log("imageName: ", imageName);
  let lastExtension = "";
  const allMtaches = imageName.toString().matchAll(IMAGE_EXTENSION_REGEX);
  for (const match of allMtaches) {
    // console.log("match: ", match);
    lastExtension = match[1].toLowerCase();
  }
  return "." + lastExtension;
};

const UploadImage = (req, res) => {
  if (!req.file) {
    return res.json({ message: "file not found" });
  }
  let imageName = req.file?.originalname;
  const imageBuffer = req.file.buffer;
  const imageExtension = getLastMatchingExtension(imageName);

  imageName = imageName.replace(IMAGE_EXTENSION_REGEX, ""); // check to remove file extensions
  let fileName =
    imageName +
    Math.ceil(Date.now() + (Date.now() % (Math.random() * 1000))).toString() + 
    imageExtension;

  fileName = fileName.replaceAll(" ", ""); // check to remve spaces
  fs.writeFileSync(IMAGES_PATH + fileName, imageBuffer);
  res.json({ image: STORED_IMAGE_PATH + fileName });
};

module.exports = UploadImage;
