const mongoose=require("mongoose")
const dotenv=require("dotenv");
dotenv.config()

module.exports={
    dbconnect:()=>{
        mongoose.connect("mongodb+srv://sirajju:242424@cluster0.xhhl5g0.mongodb.net/ToolBox")
        .then(()=>{
            console.log("Database connected successfully");

        }).catch((err)=>{
            mongoose.connect("mongodb://127.0.0.1:27017/ToolBox?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2")
            console.log("Local Database connected successfully");


            
            }
        )}
}