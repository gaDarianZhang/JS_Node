
let mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/demo",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
});
mongoose.set("useCreateIndex",true);

mongoose.connection.on("open",function (err) {
    if (err) console.log("数据库连接失败",err);
    else {
        console.log("数据库连接成功");
        console.log("我要开始写内容了！");
        let Schema = mongoose.Schema;

        let studentsRul = new Schema({
            stu_id:{
                type:String,
                required:true,
                unique:true
            },
            name:{
                type:String,
                required: true
            },
            age:{
                type:Number,
                required: true
            },
            gender:{
                type:String,
                required:true
            },
            hobby:[String],
            info:Schema.Types.Mixed,
            date:{
                type:Date,
                default:Date.now()
            },
            enable_flag:{
                type:String,
                default: "Y"
            }
        });
        let stuModel = mongoose.model("students",studentsRul);
        stuModel.create([{
            stu_id:'666',
            name:'赵日天',
            age:12,
            gender:'男',
            hobby:['女','打代码','打篮球'], //限制爱好只能为数组，数组中的每一项必须为字符串
            info:'一个风一样的男子' //接收所有类型
        },{
            stu_id:'222',
            name:'晨晨',
            age:12,
            gender:'男',
            hobby:['女','打代码','打篮球'], //限制爱好只能为数组，数组中的每一项必须为字符串
            info:'一个风一样的男子' //接收所有类型
        }
        ],function (err,data) {
            if (!err) console.log(data);
            else console.log(err);
            mongoose.disconnect();
        })
    }

})

for (let i = 0; i < 100000; i++) {
    console.log(i);
}


