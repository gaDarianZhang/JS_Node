let express = require("express");

let app = express();

app.use(express.static(__dirname+"/static"));


app.get("/ajax_get",function (req,res) {  
    res.send("收到了发送过来的get请求");
})
app.listen(3000,function (err) {  
    if (err) {
        console.log("服务器启动失败");
        return;
    }
    console.log("服务器启动成功");
    
})