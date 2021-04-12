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
    res.set("name","dgadfs");
    res.send("我是send");
    res.sendFile(__dirname+"/public/vue.png");
    res.set("age","12");
    // res.end("我是end");
    
    // console.log(res.headersSent);
    
})