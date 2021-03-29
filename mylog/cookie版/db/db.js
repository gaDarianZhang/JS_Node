let mongoose = require("mongoose");

const DB_NAME = "happyHouse";
const HOST = "127.0.0.1";
const PORT = 27017;

function connectDb(failed, success) {
    mongoose.connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    mongoose.connection.on("open", function (err) {
        if (!err) {
            console.log("数据库连接成功！");
            success();
        } else {
            console.log("数据库连接失败");
            failed(err);
        }
    })
}

module.exports = connectDb;
