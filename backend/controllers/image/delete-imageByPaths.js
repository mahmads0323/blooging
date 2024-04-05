const fs = require("fs");

const imagePrefix = "http://localhost:8000/images/retrive/";
const folderPath = "./uploads/"
const DeleteImageByPaths = async(imageByPaths)=>{
    const imagesToDelete = imageByPaths;
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
    return
}

module.exports = DeleteImageByPaths;