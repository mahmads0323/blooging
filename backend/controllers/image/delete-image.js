const fs = require("fs");

const imagePrefix = "http://localhost:8000/images/retrive/";
const folderPath = "./uploads/"
const DeleteImage = async(req, res)=>{
    // console.log("re.body: ", req.body)
    const imagesToDelete = req.body.imagesToDelete;
    try{
        for(const imageToDelete of imagesToDelete){
            const path = imageToDelete.replace(imagePrefix, "");
            fs.unlink(folderPath+path, (err)=>{
                if(err){
                    console.log("error in deleting specific path: ", err)
                }
            })
        }
    }
    catch(err){
        console.log("err in deleting images");
    }
    return res.json({message: "ok"})
}

module.exports = DeleteImage;