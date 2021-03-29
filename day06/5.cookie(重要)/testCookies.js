let express = require("express");
let cookieParser = require("cookie-parser");
let app = express();

app.disable("x-powered-by");

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.listen(3000,function (err) {  
    if (err) console.log("服务器启动失败");
    else console.log("服务器启动成功");
})

let money = {name:"张三",account:21};
// 没有cookie
app.get("/demo",function (req,res) {  
    res.send("ok");
})

// 回话cookie
app.get("/demo1",function (req,res) {  
    res.cookie("money",JSON.stringify(money));
    res.send("ok");
})

app.get("/demo2",function (req,res) {  
    res.cookie("money",JSON.stringify(money),{maxAge:1000*60});
    res.send("ok");
})

app.get("/demo3",function (req,res) {  
    console.log(req.cookies);
    console.log(JSON.parse(req.cookies.money).name);
    res.send("ok")
})

app.get("/demo4",function (req,res) {  
    res.clearCookie("money");
    res.send("ok");
})