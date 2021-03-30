# cookie

- 本质就是一个【字符串】，里面包含着浏览器和服务器沟通的信息（交互时产生的信息）。

- 存储的形式以：【key-value】的形式存储。

> 浏览器会自动携带该网站的cookie，只要是该网站下的cookie，全部携带。

- 分类：
    - 会话cookie（关闭浏览器后，会话cookie会自动消失，会话cookie存储在浏览器运行的那块【内存】上）。
    - 持久化cookie：（看过期时间，一旦到了过期时间，自动销毁，存储在用户的硬盘上,备注：如果没有到过期时间，同时用户清理了浏览器的缓存，持久化cookie也会消失）。

- 工作原理：
    - 当浏览器第一次请求服务器的时候，服务器可能返回一个或多个cookie给浏览器

    - 浏览器判断cookie种类
        - 会话cookie：存储在浏览器运行的那块内存上
        - 持久化cookie：存储在用户的硬盘上
    - 以后请求该网站的时候，自动携带上该网站的所有cookie（无法进行干预）
    - 服务器拿到之前自己“种”下的cookie，分析里面的内容，校验cookie的合法性，根据cookie里保存的内容，进行具体的业务逻辑。

- 应用：
    - 解决http无状态的问题（例子：7天免登录，一般来说不会单独使用cookie，一般配合后台的session存储使用）

- 不同的语言、不同的后端架构cookie的具体语法是不一样的，但是cookie原理和工作过程是不变的。

> <span style="color:red">备注：cookie不一定只由服务器生成，前端同样可以生成cookie，但是前端生成的cookie几乎没有意义。</span>

- 对比浏览器的本地存储：

    1. localStorage：

           (1).保存的数据，只要用户不清除，一直存在

           (2).作为一个中转人，实现跨页签通信。

           (3).保存数据的大小：5MB - 10MB

    2. sessionStorage：

           (1).保存的数据，关闭浏览器就消失

           (2).保存数据的大小：5MB - 10MB

    3. cookie：

          (1).分类：会话cookie----关浏览器消失、持久化cookie----到过期时间消失

          (2).保存数据的大小:4K --- 8K

          (3).主要用于解决http无状态(一般配合后端的session会话存储使用)

          (4).浏览器请求服务器时，会自动携带该网站的所有cookie

```js
//会话cookie，关闭浏览器即立刻消失
//demo1路由，负责给客户端“种”下一个【会话cookie】!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/demo1',function (req,res) {
  //express中给客户端“种”cookie不需要任何的库
  let obj = {school:'atguigu',subject:'qianduan'}
  res.cookie('peiqi',JSON.stringify(obj)) //给客户端种下一个会话cookie
  res.send('我是demo1路由给你的反馈，我给你种下了一个【会话cookie】，你赶紧去浏览器里看看！')
})

//demo2路由，负责给客户端“种”下一个【持久化cookie】!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/demo2',function (req,res) {
  let obj = {school:'atguigu2',subject:'qianduan2'}
  res.cookie('peiqi',JSON.stringify(obj),{maxAge:1000 * 60}) //给客户端种下一个持久化cookie
  res.send('我是demo2路由给你的反馈，我给你种下了一个【持久化cookie】，你赶紧去浏览器里看看！')
})

//demo3路由，负责【读取】客户端所携带过来cookie!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/demo3',function (req,res) {
  //express中读取客户端携带过来的cookie要借助一个中间件，名为：cookie-parser
  console.log(req.cookies);
  const {peiqi} = req.cookies
  let a = JSON.parse(peiqi)
  console.log(a.school)
  res.send('我是demo3路由,我读取了你携带过来的cookie，你去服务器控制台看看吧')
})

//demo4路由，负责告诉客户端【删除一个cokkie】!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/demo4',function (req,res) {
  //res.cookie('peiqi','',{maxAge:0});//第一种删除方法，不借助第三方
  res.clearCookie('peiqi')
  res.send('兄台，我删除了你所保存的key为peiqi的那个cookie')
})
```



# session

- 标准来说，session这个单词指的是会话。
          (1).前端通过浏览器去查看cookie的时候，会发现有些cookie的过期时间是：session，意味着该cookie是会话cookie。
           (2).后端人员常常把【session会话存储】简称为：session存储，或者更简单的称为：session
- 特点：
            1.存在于服务端
            2.存储的是浏览器和服务器之间沟通产生的一些信息
- 默认session存储在服务器的内存中，每当一个新客户端发来请求，服务器都会新开辟出一块空间，供session会话存储使用。
- 工作流程：
            --第一次浏览器请求服务器的时候，服务器会开辟出一块内存空间，供session会话存储使用。
            --返回响应的时候，会自动返回一个cookie（有时候会返回多个，为了安全），cookie里包含着，上一步产生会话存储“容器”的编号（id）
            --以后请求的时候，会自动携带这个cookie，给服务器。
            --服务器从该cookie中拿到对应的session的id，去服务器中匹配。
            --服务器会根据匹配信息，决定下一步逻辑
- 备注：
    - 一般来说cookie一定会配合session使用。
    - 服务端一般会做session的持久化，防止由于服务器重启，造成session的丢失。
    - session什么时候销毁？
             (1).服务器没有做session的持久化的同时，服务器重启了。
             (2).给客户端种下的那个用于保存session编号的cookie销毁了，随之服务器保存的session销毁(不管是否做了session的持久化)。
              (3).用户主动在网页上点击了“注销” “退出登录”等等按钮。



```js
//引入包
let session = require("express-session");
let mongoSession = require("connect-mongo")(session);

//server.js引入中间件
app.use(session({
    name:"sessionKey",
    secret:"unsecure",
    saveUninitialized:false,
    resave:false,
    store:new mongoSession({
        url:"mongodb://localhost:27017/session_container",
        touchAfter:3600
    }),
    cookie:{
        maxAge:1000*60,
        httpOnly:true
    }
}));
//向session写入
 req.session._id = data._id.toString();
//读出
let {_id} = req.session;
```

