let {Router} = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");   
let usersModel = require("../model/usersModel");

let router = new Router();
router.use(cookieParser());

router.get("/login",function (req,res) {  
    // console.log(path.resolve(__dirname,"../static/login.html"));
    const {email} = req.query;
    res.render("login",{errMsg:{email}});
})
router.get("/register",function (req,res) {  
    res.render("register",{errMsg:{}});
})

router.get("/userCenter",function (req,res) {  
    // let {_id} = req.cookies;
    // console.log(_id,typeof _id);
    let {_id} = req.session;
    
    //有cookie
    if (_id) {
        usersModel.findOne({_id},function (err,data) {  
            //说明没有恶意修改cookie
            if (data) {
                res.render("userCenter",{nickName:data.nick_name})
                return;
            }
            else{
                res.redirect("http://localhost:3000/login");
            }
        })
    }
    //没有cookie
    else{
        res.redirect("http://localhost:3000/login");
    }
})


//这里命名可以直接一个module.exports = router;
//后边这个router要当做中间件来使用，而中间件的一个普遍共识就是它是一个函数。
module.exports = function () {  
    return router;
}