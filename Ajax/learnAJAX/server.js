let express = require("express");
let app = express();

app.use(express.static(__dirname+"/static"));
app.use(express.urlencoded({extended:true}));


app.get("/ajax_get",function (req,res) {  
    console.log("这里是接收get请求的路由");
    console.log(req.query);
    res.send("收到了发送过来的get请求");
});
app.post("/ajax_post",function (req,res) {  
    console.log("这里是接收post请求的路由");
    console.log(req.body);
    res.send("收到了发送过来的post请求");
})
app.listen(3000,function (err) {  
    if (err) {
        console.log("服务器启动失败");
        return;
    }
    console.log("服务器启动成功");
    
})