let {Router} = require("express");
let router = new Router();
let usersModel = require("../model/usersModel.js");


router.post("/register",function (req,res) {  
    const {email,nick_name,password,re_password} = req.body;
    const emailReg = /^[0-9a-zA-Z_]{5,20}@[a-z0-9]{2,6}\.(com|cn)$/;
    const nickNameReg = /^[0-9A-Za-z_]{1}\w+/;
    const passwordReg = /[A-Za-z0-9.,@#$&*]{6,20}/;
    let errMsg = {};
    if (!emailReg.test(email)) {
        errMsg.email = "输入的邮箱不合法";
        res.send("请输入合法的邮箱地址");
    }
    if (!nickNameReg.test(nick_name)) {
        res.send("昵称格式不合法");
    }
    if(!passwordReg.test(password)){
        res.send("密码格式不合法");
    }
    if(password !== re_password){
        res.send("两次输入密码不一致");
    }else{
        usersModel.findOne({email:email},function (err,data) {
            if(data){
                console.log(`邮箱为${email}的用户注册失败，因为邮箱重复`);
                res.send('该邮箱已被注册，请更换邮箱');
            }else{
                usersModel.findOne({nick_name},function (err,data) {  
                    if (!data) {
                        usersModel.create({email,nick_name,password},function (err) {  
                            if(!err){
                                //如果写入成功了
                                console.log(`邮箱为${email}的用户注册成功`)
                                res.send('注册成功了')
                            }else{
                                //如果写入失败了
                                //引入报警模块，当达到敏感阈值，触发报警。
                                console.log(err)
                                res.send('您当前的网络状态不稳定，稍后重试')
                            }
                        });
                    }else{
                        res.send("该昵称已被使用，请换一个试试");
                    }
                });
                
            }
        });
    }
});

router.post("/login",function (req,res) {  
    const {email,password} = req.body;
    const emailReg = /^[0-9a-zA-Z_]{5,20}@[a-z0-9]{2,6}\.(com|cn)$/;
    const passwordReg = /[A-Za-z0-9.,@#$&*]{6,20}/;
    if (!emailReg.test(email)) {
        res.send('邮箱格式不合法')
    }else if(!passwordReg.test(password)){
        res.send('密码格式不合法')
    }else{
        usersModel.findOne({email,password},(err,data)=>{
            if (err) {
                console.log("err");
                res.send("当前网络不稳定，请稍后再试")
                return;    
            }
            if (data) {
                console.log("登陆成功");
                
                res.redirect("https://baidu.com");
                // res.send("redirect后的send");Cannot set headers after they are sent to the client
                return;
            }
            res.send("用户名或密码输入错误");
        });
    }
});

module.exports = function () {  
    return router;
}