const mongoose = require("mongoose");

async function Conn(){
   
    const connectionDB = await mongoose.connect(process.env.DB)
    if(connectionDB)  console.log("MONGO DB ATLAS IS CONNECTED")

}


module.exports = {Conn}