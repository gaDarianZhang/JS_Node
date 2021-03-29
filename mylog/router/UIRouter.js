let {Router} = require("express");
let path = require("path");

let router = new Router();

router.get("/login",function (req,res) {  
    // console.log(path.resolve(__dirname,"../static/login.html"));
    const {email} = req.query;
    res.render("login",{errMsg:{email}});
})
router.get("/register",function (req,res) {  
    res.render("register",{errMsg:{}});
})

router.get("/userCenter",function (req,res) {  
    let {nick_name} = req.query;

    res.render("userCenter",{nickName:nick_name});
})


//这里命名可以直接一个module.exports = router;
//后边这个router要当做中间件来使用，而中间件的一个普遍共识就是它是一个函数。
module.exports = function () {  
    return router;
}