``` 
问题：从用户输入URl按下回车，一直到用户能看到界面，期间经历了什么？

一、DNS解析----域名翻译成IP地址（优先走缓存）：

​	1.找浏览器DNS缓存解析域名

​	2.找本机DNS缓存：(备注：查看本机DNS缓存命令：ipconfig/displaydns > C:/dns.txt)

​	3.找路由器DNS缓存

​	4.找运营商DNS缓存（80%的DNS查找，到这一步就结束）

​	5.递归查询 (查询全球13台根DNS服务器)

二、进行TCP（协议）连接，三次握手（根据上一步请求回来的ip地址，去联系服务器）

​	第一次握手：由浏览器发给服务器，我想和你说话，你能“听见”嘛？

​	第二次握手：由服务器发给浏览器，我能听得见，你说吧！

​	第三次握手：由浏览器发给服务器，好，那我就开始说话。

三、发送请求（请求报文）

四、得到响应（响应报文）

五、浏览器开始解析html

​	--预解析：将所有外部的资源，发请求出去

​	--解析html，生成DOM树

​	--解析CSS，生成CSS树

​	--合并成一个render树

​	--js是否操作了DOM或样式

   	  --有：进行重绘重排（不好，1.尽量避免；2.最小化重绘重排）

  	  --没有：null

​	--最终展示界面

六、断开TCP连接，四次挥手（确保数据的完整性）

​	第一次挥手：由浏览器发给服务器，我的东西接受完了，你断开吧。

​	第二次挥手：--由服务器发给浏览器，我还有一些东西没接收完，你等一会，我接收好了且验证好了我告诉你

​    		  --由服务器发给浏览器，我的东西接收完了，但是你还得等一会，我要验证数据的完整性，验证完了我告诉你。

​	第三次挥手：由服务器发给浏览器，我接收完（验证完）了，你断开吧。

​	第四次挥手：由浏览器发给服务器，好的，那我断开了。



备注：为什么握手要三次，挥手要四次？

​	握手之前，还没有进行数据的传输，确保握手就可以了。

​	挥手之前，正在进行数据的传输，为了确保数据的完整性，必须多经历一次验证（继续接	收）
```

## Express

> Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你快速创建各种 Web 和移动设备应用。
>
> 简单来说Express就是运行在node中的用来搭建服务器的模块。需要手动安装，不是node内置的。

## express中操作cookie和session教程

### 一、操作cookie：

    1. 设置cookie(给客户端“种”cookie)：
        直接使用res.cookie('','',{})即可。
        
    2. 获取cookie(要第三方中间件):
           * 安装：npm i cookie-parser
           * 引入：const cookieParser = require('cookie-parser')
           * 使用：app.use(cookieParser())
    
    3. 返回给客户端一个cookie：
           * res.cookie('username','peiqi',{maxAge:1000*60*60})
           
           备注：1.cookie是以：key-value的形式存在的，前两个参数分别为：key、value。
                2.maxAge用于配置cookie有效期(单位毫秒)。
                3.如果不传入maxAge配置对象，则为会话cookie，随着浏览器的关闭cookie自动会消失。
                4.如果传入maxAge，且maxAge不为0，则cookie为持久化cookie，即使用户关闭浏览器，
                  cookie也不会消失，直到过了它的有效期。
    
    4. 接收客户端传递过来的cookie：
            * req.cookies.xxx ：获取cookie上xxx属性对应的值。
            备注：cookie-parser中间件会自动把客户端发送过来的cookie解析到request对象上。


### 二、操作session（cookie配合session）：

​    1.下载安装：npm i express-session --save  用于在express中操作session
​    2.下载安装：npm i connect-mongo --save 用于将session写入数据库（session持久化）
​    3.引入express-session模块：
​        const session = require('express-session');
​    4.引入connect-mongo模块：
​        const MongoStore = require('connect-mongo')(session);
​    5.编写全局配置对象：
​        app.use(session({
​          name: 'userid',   //设置cookie的name，默认值是：connect.sid
​          secret: 'atguigu', //参与加密的字符串（又称签名）
​          saveUninitialized: false, //是否在存储内容之前创建会话
​          resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
​          store: new MongoStore({
​            url: 'mongodb://localhost:27017/sessions_container',
​            touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
​          }),
​          cookie: {
​            httpOnly: true, // 开启后前端无法通过 JS 操作cookie
​            maxAge: 1000*30 // 设置cookie的过期时间
​          },
​        }));
​    6.向session中添加一个xxxx，值为yyy：req.session.xxxx = yyy
​    7.获取session上的xxx属性：const {xxx} = req.session

    整个过程是：
        1.客户端第一次发起请求，服务器开启一个session专门用于存储这次请求的一些信息。
        2.根据配置对象的信息，服务器决定是否进行：session持久化等其他操作。
        2.与此同时服务器创建了一个cookie，它的key我们可以自己指定，但是它的value一定是上一步session的唯一标识。
        3.服务器将我们指定好的内容添加进session对象，例如：req.session.xxxx = yyy。
        4.等请求再次过来时，客户端的请求中包含着之前“种”的cookie。
        5.服务器检查携带过来的cookie是否有效，决定是否去读取对应session中的信息。


​    