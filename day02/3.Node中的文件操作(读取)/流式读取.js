let {createReadStream,createWriteStream} = require("fs");

let rs = createReadStream("./test.mp4",{
    highWaterMark:15*1024*1024
});
let ws = createWriteStream("./receive.mp4",{
    flags:'w'
})
rs.on("open",()=>{
    console.log("read start");
});
rs.on("close",()=>{
    console.log("read end");
    ws.end();
});

ws.on("open",()=>{
    console.log("write start");
});
ws.on("close",()=>{
    console.log("write end");
});
rs.on("data",function (data) {
    console.log(data.length);
    ws.write(data);
})
