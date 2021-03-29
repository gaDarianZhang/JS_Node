//启动服务器
let express = require("express");
let app = express();
//引入模块

let connectDb = require("./db/db");
let UIRouter = require("./router/UIRouter");
let processRouter = require("./router/processRouter");

app.disable("x-powered-by");

//服务器监听端口，并判断启动是否成功
app.listen(3000,function (err) { 
    //服务器启动成功
    if (!err) {
        console.log("服务器启动成功");
        //连接数据库
        connectDb((error)=>{console.log("我找不到数据库了:",error);}
        ,()=>{
            app.use(express.urlencoded({extended:true}));
            //看来必须是绝对路径
            app.use(express.static(__dirname+"/static"));
            // app.use(express.static("./static"));

            app.use(UIRouter());
            app.use(processRouter());
        });
    } 
    //服务器启动失败
    else {
        console.log(err);
    }
});
