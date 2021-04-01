let express = require("express");
let app = express();
app.use(express.static(__dirname));

app.get("/cancel",function (req,res) {  
    console.log("服务器收到了前端的请求");
    let authCode = Math.floor(Math.random()*9000+1000);
    console.log("服务器端已生成验证码：",authCode);
    setTimeout(()=>{
        console.log("服务器开始向前端发送验证码");
        res.send(authCode.toString());
        console.log(Date.now());
    },3000);
})
app.listen(3000,function (err) {  
    if (err) {
        console.log("服务器启动失败：",err);
    }else{
        console.log("服务器启动成功");
    }
})