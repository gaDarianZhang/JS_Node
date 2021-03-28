//启动服务器
let express = require("express");
let app = express();
//引入模块
let usersModel = require("./model/usersModel.js");
let connectDb = require("./db/db");

app.disable("x-powered-by");

//服务器监听端口，并判断启动是否成功
app.listen(3000,function (err) { 
    //服务器启动成功
    if (!err) {
        console.log("服务器启动成功");
        //连接数据库
        connectDb((error)=>{console.log("我找不到数据库了:",error);}
        ,()=>{
            app.use(express.urlencoded({extended:true}));
            // app.use(express.static(__dirname+"/static"));
            app.use(express.static("/static"));
            app.get("/login",function (req,res) {  
                res.sendFile(__dirname+"/static/login.html");
            })
            app.get("/register",function (req,res) {  
                res.sendFile(__dirname+"/static/register.html");
            })
            app.post("/register",function (req,res) {  
                const {email,nick_name,password,re_password} = req.body;
                const emailReg = /^[0-9a-zA-Z_]{5,20}@[a-z0-9]{2,6}\.(com|cn)$/;
                const nickNameReg = /^[0-9A-Za-z_]{1}\w+/;
                const passwordReg = /[A-Za-z0-9.,@#$&*]{6,20}/;
                if (!emailReg.test(email)) {
                    res.send("请输入合法的邮箱地址");
                }else if (!nickNameReg.test(nick_name)) {
                    res.send("昵称格式不合法");
                }else if(!passwordReg.test(password)){
                    res.send("密码格式不合法");
                }else if(password !== re_password){
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
            
        });
    } 
    //服务器启动失败
    else {
        console.log(err);
    }
});
