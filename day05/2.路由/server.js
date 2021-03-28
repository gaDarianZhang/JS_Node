let express = require("express");

let app = express();

app.listen(3000,function (err) {
    if(!err){
        console.log("服务器启动成功了");
    }else{
        console.log(err);
        
    }    
});

app.get("/",function (req,res) {  
    console.log("我是request.query",req.query);
    console.log("我是request.params",req.params);
    console.log("request.get：",req.get("connection"));

    // res.set("name","张洪彬");//被浏览器报错了，可以用来设置更改已知的属性
    // res.send("我是send");
    res.sendFile(__dirname+"/public/vue.png");
    // res.end("我是end");
    
    // console.log(res.headersSent);
    
})