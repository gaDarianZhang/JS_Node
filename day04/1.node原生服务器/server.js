let http = require("http");

let queryStr = require("querystring");

let server = http.createServer(function (request,response) {
   let queryPara = request.url.split("?")[1];
   let objPara = queryStr.parse(queryPara);
   console.log(objPara);
   let {name,age} = objPara;
   response.setHeader("content-type","text/html;charset=utf-8");
   response.end(`<h1>${name}你的年龄是${age}</h1>`);
});

server.listen(3000,function (err) {
    if (err) {
        console.log(err);
        return
    }else{
        console.log("链接成功");
    }
})

