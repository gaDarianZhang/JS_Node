/*
  ·中间件：
      概念：本质上就是一个函数，包含三个参数：request、response、next

  作用：
        1)	执行任何代码。
        2)	修改请求对象、响应对象。
        3)	终结请求-响应循环。(让一次请求得到响应)
        4)	调用堆栈中的下一个中间件或路由。
  分类：
        1)	应用(全局)级中间件（过滤非法的请求，例如防盗链）
              --第一种写法：app.use((request,response,next)=>{})
                --next()是指在中间件中没有进行response响应时，给这个请求方形，继续进行后边的路由或者中间件过滤。
                --中间件位置随意放，可以放在最开头，也可以穿插在各级路由中间，路由和中间件按照位置顺序执行。
              --第二种写法：使用函数定义
                --第二种写法就是把中间件定义为一个带有req,res和next方法的函数，然后把这个函数放在路由的uri和回调函数中间。
                --这样的话，不必每一次请求都要去经过中间件的过滤检查（浪费时间和算力），而是在需要的路由前进行检查。
        2)	第三方中间件，即：不是Node内置的，也不是express内置的（通过npm下载的中间件，例如body-parser）
              --app.use(bodyParser.urlencoded({extended:true}));
                --使用了这个中间件之后，后边在post请求的路由中就可以使用req.body来获得post请求的请求体参数了。
        3)	内置中间件（express内部封装好的中间件）
              --app.use(express.urlencoded({extended:true}))
                --这个和body-parser的用法一样
              --app.use(express.static('public')) //暴露静态资源
                --这种方法是一次性把static()指定文件夹内的静态资源都给暴露出去。
                --例如，正常我一个网站有food/play/cloth等页面，那我就要写root/food路由，root/play路由和root/cloth路由，
                --在每个路由内response对应的html文件。如果有很多很多的话，那我就要写太多的路由了。通过express.static()方法，
                --一次性把所有文件都交出去，这样访问的时候，要使用对应的文件名（加后缀）就能直接访问到这个静态资源了，不必再去匹配路由了。
                --（其实加了文件后缀之后本来也就没办法去匹配路由哈）
        4)	路由器中间件 （Router）
              --后面讲
    备注：
        1.在express中，定义路由和中间件的时候，根据定义的顺序（代码的顺序），将定义的每一个中间件或路由，
        放在一个类似于数组的容器中，当请求过来的时候，依次从容器中取出中间件和路由，进行匹配，如果匹配
        成功，交由该路由或中间件处理，如果全局中间件写在了最开始的位置，那么他就是请求的“第一扇门”。
        2.对于服务器来说，一次请求，只有一个请求对象，和一个响应对象，其他任何的request和response都是对二者的引用。
 */

const express = require('express')
//引入body-parser，用于解析post参数
//const bodyParser = require('body-parser')
const app = express()

//1.【第一种】使用应用级(全局)中间件------所有请求的第一扇门-------所有请求都要经过某些处理的时候用此种写法
/*app.use((request,response,next)=>{
  //response.send('我是中间件给你的响应')
  //request.test = 1 //修改请求对象
  //图片防盗链
  if(request.get('Referer')){
    let miniReferer = request.get('Referer').split('/')[2]
    if(miniReferer === 'localhost:63347'){
      next()
    }else{
      //发生了盗链
      response.sendFile(__dirname+'/public/err.png')
    }
  }else{
    next()
  }
  //next()
})*/


//1.【第二种】使用全局中间件的方式------更加灵活，不是第一扇门，可以在任何需要的地方使用。
//    放在任何路由的uri和回调函数中间。
function guardPic(request,response,next) {
  //防盗链
  if(request.get('Referer')){
    let miniReferer = request.get('Referer').split('/')[2]
    if(miniReferer === 'localhost:63347'){
      next()
    }else{
      //发生了盗链
      response.sendFile(__dirname+'/public/err.png')
    }
  }else{
    next()
  }
}

//2. 使用第三方中间件bodyParser，和request.body配合使用。

//解析post请求请求体中所携带的urlencoded编码形式的参数为一个对象，随后挂载到request对象上
//app.use(bodyParser.urlencoded({extended: true}))，之后在路由中就可以获取post请求的请求体参数

//3. 解析post请求请求体中所携带的urlencoded编码形式的参数为一个对象，随后挂载到request对象上
app.use(express.urlencoded({extended: true}))//这是express内置的一个方法，效果和body-parser的urlencoded一样。

//3. 使用内置中间件去暴露静态资源 ---- 一次性把你所指定的文件夹内的资源全部交出去。
app.use(express.static(__dirname+'/public'))

app.get('/',(request,response)=>{
    console.log(request.demo)
    response.send('ok')
})

app.get('/demo',(request,response)=>{
    console.log(request.demo)
    console.log(request.query)
    response.send('ok2')
})

app.get('/picture',guardPic,(request,response)=>{
  response.sendFile(__dirname+'/public/demo.jpg')
})

app.post('/test',(request,response)=>{
  console.log(request.body)
  response.send('ok')
})


app.listen(3000,function (err) {
  if(!err) console.log('ok')
  else console.log(err)
})