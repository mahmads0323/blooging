const mongoose = require("mongoose")

const Connection = async (connectionString)=>{
    try{
        mongoose.connect(connectionString).then(()=>{
            console.log("Mongodb connected")
        }).catch(e => {
            console.log("Mongodb error: ", e)
        })
    }catch(e){
        console.log("Error in connecting database")
    }
}

module.exports = Connection;