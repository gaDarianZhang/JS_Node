let connectDb = require("./db/db");
let usersModel = require("./model/usersModel");

connectDb((error)=>error,()=>{
    usersModel.findOne({nick:"1234"},function (err,data) {  
        console.log(err);
        console.log(data);
        
    })
});
