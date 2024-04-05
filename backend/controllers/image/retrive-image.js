const fs = require("fs");

const IMAGES_PATH = "./uploads/";

const RetriveImage = (req, res)=>{
    const imageName = req.params.image;
    fs.readFile(IMAGES_PATH+imageName, (err, image)=>{
        if(err){
            return res.json({message: `error in retriving image ${err}`})
        }
        const contentType = "image/png";
        res.setHeader("Content-Type", contentType);
        // Set additional headers to prevent automatic download
        res.setHeader("Content-Disposition", "inline");
        return res.send(image)
    })
}

module.exports = RetriveImage;