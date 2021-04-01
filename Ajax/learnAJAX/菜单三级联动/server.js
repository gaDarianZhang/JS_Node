let express = require("express");
let app = express();
let cityModel = require("./model/cityModel.js");
let connectMongo = require("./db/cities.js");
app.set
app.listen(3000, function (err) {
    if (err) {
        console.log("服务器启动失败：", err);
    } else {
        console.log("服务器启动成功");
        connectMongo((error) => {
            console.log(error);
        }, () => {
            // app.get("/",function (req,res) {  
            //     cityModel.find({province:"11"},function(err,data){
            //         console.log(data);
            //     });
            // });
            //获取所有省份信息
            app.get("/get_all_provinces", function (req, res) {
                res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500");
                cityModel.find({level:1},{province:1,name:1,_id:0},function (err,data) {
                    if (!err && data) {
                        res.send({ status: 1, data });
                    } else {
                        res.send({ status: 0, err });
                    }
                });
            });
            //根据省份编码，获取指定省份的所有地级市信息
            app.get("/get_cities_of_province", function (req, res) { 
                res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500");
                let {province} = req.query;
                cityModel.find({province,level:2},{city:1,name:1,_id:0},function(err,data){
                    if (!err&&data) {
                        res.send({status:1,data});
                    }else{
                        res.send({status:0,err});
                    }
                });
            });
            //根据省份编码和市编码，获取指定城市的所有区县信息\
            app.get("/get_counties_of_city", function (req, res) { 
                res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500");
                let {province,city} = req.query;
                cityModel.find({province,city,level:3},{county:1,name:1,_id:0},function(err,data){
                    if (!err&&data) {
                        res.send({status:1,data});
                    }else{
                        res.send({status:0,err});
                    }
                }) 
            });
        });
    }
});
