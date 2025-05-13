const mongoose = require("mongoose");
const app=require("./app");
const dotenv=require("dotenv");

process.on('unhandledRejection',err =>{
    console.log(err.name,err.message);
    console.log("unhandled rejection");
    Server.close(()=>{
        process.exit(1);

    })
})

process.on('uncaughtException',err =>{
    console.log(err.name,err.message);
    console.log("uncaought exception");
    Server.close(()=>{
        process.exit(1);

    })
})
dotenv.config({path:"./config.env"});

mongoose.connect(process.env.DATABASE_LOCAL).then(()=>console.log("DB connection succesfully"))

const port=4000;
app.listen(port,()=>{
    console.log("Server is running")
})


