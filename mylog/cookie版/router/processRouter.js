let { Router } = require("express");
let router = new Router();
let usersModel = require("../model/usersModel.js");




router.post("/register", function (req, res) {
    const { email, nick_name, password, re_password } = req.body;
    const emailReg = /^[0-9a-zA-Z_]{5,20}@[a-z0-9]{2,6}\.(com|cn)$/;
    const nickNameReg = /^[0-9A-Za-z_]{1}\w+/;
    const passwordReg = /[A-Za-z0-9.,@#$&*]{6,20}/;
    let errMsg = {};
    if (!emailReg.test(email)) {
        errMsg.emailErr = "邮箱格式不合法";
    }
    if (!nickNameReg.test(nick_name)) {
        errMsg.nickErr = "昵称格式不合法";
    }
    if (!passwordReg.test(password)) {
        errMsg.passwordErr = "密码格式不合法";
    }
    if (password !== re_password) {
        errMsg.rePasswordErr = "两次输入密码不一致";
    }
    if (JSON.stringify(errMsg) !== "{}") {
        res.render("register", { errMsg });
        return;
    }
    usersModel.findOne({ email }, function (err, data) {
        //email已经被注册
        if (data) {
            console.log(`邮箱为${email}的用户注册失败，因为邮箱重复`);
            errMsg.emailErr = `邮箱${email}已经被注册了，请再换一个邮箱试试`;
            res.render("register",{errMsg})
            return;
        }
        //达到注册条件，开始注册
        usersModel.create({ email, nick_name, password }, function (err, data) {
            //注册失败
            if (!data) {
                console.log(`邮箱为${email}的用户注册失败了,因为服务器错误`, err);
                errMsg.netErr = "您的网络不稳定，请稍后再试";
                res.render("register",{errMsg});
                return;
            }
            //注册成功
            console.log(`邮箱为${email}的用户注册成功`);
            res.redirect(`/login?email=${email}`);
        });
    });

});

router.post("/login", function (req, res) {
    const { email, password } = req.body;
    const emailReg = /^[0-9a-zA-Z_]{5,20}@[a-z0-9]{2,6}\.(com|cn)$/;
    const passwordReg = /[A-Za-z0-9.,@#$&*]{6,20}/;
    const errMsg = {};
    if (!emailReg.test(email)) {
        errMsg.emailErr = "邮箱格式不合法";
    } 
    if (!passwordReg.test(password)) {
        errMsg.passwordErr = "密码格式不合法";
    }
    if (JSON.stringify(errMsg)!=="{}") {
        res.render("login",{errMsg});
        return;
    }
    //邮箱和密码格式合法
    usersModel.findOne({ email, password }, (err, data) => {
        if (err) {
            console.log("服务器出现错误",err);
            errMsg.netErr = "您的网络不稳定，请稍后重试";
            res.render("login",{errMsg});
            return;
        }
        if (data) {
            console.log(`邮箱为${email}的用户登录成功`);
            res.cookie("_id",data._id.toString(),{maxAge:1000*60});
            // console.log(data._id,typeof data._id);
            
            res.redirect(`http://localhost:3000/userCenter`);
            // res.send("redirect后的send");Cannot set headers after they are sent to the client
            return;
        }
        errMsg.loginErr = "用户名或密码错误";
        res.render("login",{errMsg});
    });

});

module.exports = function () {
    return router;
}