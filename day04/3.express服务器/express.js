//引入express
const express = require('express')

//1.创建app服务对象
const app = express();
//禁止服务器返回X-Powered-By
app.disable('x-powered-by')//!!!!!!!!!!!!!!!!!!!

//2.配置路由 ------ 对请求的url进行分类，服务器根据分类决定交给谁去处理。
/*
  (1).在Node.js课程中，我们所有说的“路由”,默认都是指【后端路由】
  (2).路由可以理解为：一组一组key-value的组合，key:请求方式+URI路径 ， value:回调函数
  (3).根据路由定义的顺序(写代码的顺序),依次定义好路由，随后放入一个类似数组的结构，当有请求时，
      依次取出匹配，意思是如果有多个请求方式和URI相同的路由，那么后边的会被忽略，后者不会覆盖前者。
      若匹配成功，不再继续匹配了。
  (4).该URL:http://locahost:3000/meishi 中meishi，叫什么？ 1.URI名字 2.虚拟路径名字
*/
//根路由
app.get('/', function (request, response) {
  /*
  * 问题：得是什么样的请求，能交给这个回调函数处理？
  *       1.请求方式必须为GET
  *       2.请求的URI必须为:“/”
  * */
  console.log(request.query)
  console.log(request.url)
  console.log(request.params);//拿到参数路由的参数，是一个对象,在这里就是空的了
  console.log(request.get("Cache-Control"));
  response.status(200);
  response.send('ok')
})

//一级路由
app.get('/meishi', function (request, response) {
  /*
  * 问题：得是什么样的请求，能交给这个回调函数处理？
  *       1.请求方式必须为GET
  *       2.请求的URI必须为:“/meishi”
  * */
  response.send('<h1>我是美食页面</h1>')
})

//二级路由
app.get('/meishi/c17', function (request, response) {
  response.send('我是美食-火锅页面')
})

//根路由
app.post('/', function (request, response) {
  response.send('你发的是post请求')
  console.log(request.query);  //查询字符串对象
  console.log(request.get("Cache-Control"));
  
})

//3.指定服务器运行的端口号(绑定端口监听)
app.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了')
  else console.log(err)
})