let mongoose = require("mongoose");

const DB_NAME = "cities";
const HOST = "localhost";
const PORT = 27017;
mongoose.set("useCreateIndex",true);

function connectMongo(failed,success) {
    mongoose.connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    mongoose.connection.on("open",(err)=>{
        if (err) {
            console.log("数据库连接失败");
            failed(err);
        }else{
            console.log("数据库连接成功");
            success();
        }
    });
}
module.exports = connectMongo;