# AJAX

> AJAX 全称为Asynchronous Javascript And XML，就是异步的 JS 和 XML。
>
> 通过AJAX可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。
>
> AJAX 不是新的编程语言，不是新的一门独立的技术，而是一种使用现有标准的新方法。
>
> Ajax的工作原理相当于在用户和服务器之间加了一个中间层(Ajax引擎)，使用户操作与服务器响应异步化。

- 优缺点
    - 优点：
        - 1) 可以无需刷新页面而与服务器端进行通信。
        - 2) 允许你根据用户事件来更新部分页面内容。
    - 缺点：
        - 没有浏览历史，不能回退
        - 存在跨域问题
        - SEO不友好
- AJAX-post:
    - urlencoded：加一个特殊的请求头
    - json:



## 跨域问题

> <span style="color:red">ajax的跨域问题对服务器没影响，ajax可以发送数据，对浏览器接收数据有影响。</span>

### 1.为什么会有跨域这个问题？

   > 原因是浏览器为了安全，而采用的同源策略（Same origin policy）

### 2.什么是同源策略？

    1. 同源策略是由Netscape提出的一个著名的安全策略，现在所有支持JavaScript 的浏览器都会使用这个策略。
    2. Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。
    3. 所谓同源，也称之为同域，是指：协议，域名（IP），端口必须要完全相同
       即：协议、域名（IP）、端口都相同，才能算是在同一个域里。

备注：规则举例如下(假设已有网站地址为：http://study.cn)
![Alt text](https://s2.ax1x.com/2019/01/26/knAIit.png)

### 3.没有同源策略的危险场景：

危险场景：

> 有一天你刚睡醒，收到一封邮件，说是你的银行账号有风险，赶紧点进www.yinghang.com改密码。你着急的赶紧点进去，还是熟悉的银行登录界面，你果断输入你的账号密码，登录进去看看钱有没有少了，睡眼朦胧的你没看清楚，平时访问的银行网站是www.yinhang.com，而现在访问的是www.yinghang.com，随后你来了一条短信，钱没了，这个钓鱼网站做了什么呢？大概是如下思路：

```html
<iframe id="baidu" src="https://www.baidu.com"></iframe>

<script type="text/javascript">
  const iframe = window.frames['baidu']
  const inputNode = iframe.document.getElementById('输入敏感信息的input的id')
  console.log(inputNode.value)
</script>
```

### 3.非同源受到哪些限制？即：跨域了你不能干那些事情

			1. <span style="color:orange;">**Cookie不能读取；**</span>
   			2. <span style="color:orange;">**DOM无法获得；**</span>
   			3. <span style="color:orange;">**Ajax请求不能获取数据**</span>

#### 为什么form表单跨域不拦截

- <span style="color:orange;">发送的ajax请求走的是浏览器的ajax引擎，严格遵守同源策略。</span>
- <span style="color:orange;">form表单发出的请求走的不是ajax引擎，是浏览器的其他模块，不受同源策略限制。</span>
- <span style="color:red;font-weight:bold;font-size:18px">form表单不受限制的原因是：</span>
    - form表单站在63348端口向3000端口发送请求后，如果有数据返回（如果是重定向的话，可以直接定到其他网站。至于后边会不会产生跨域，就看在这个网站上发送的请求了，和我现在的就没关系了），那么返回数据显示的页面地址就刷新到了3000端口。而我通过ajax在63348端口向3000端口发送请求，由于页面无刷新获取数据，也就是获取数据后，数据还是返回给63348端口的，这就产生了跨域。

### 4.如何在开发中解决跨域问题：

**1.JSONP解决发送请求跨域问题：**

> 要明确的是：JSONP不是一种技术，而是程序员“智慧的结晶”（利用了标签请求资源不受同源策略限制的特点）
> JSONP需要前后端人员互相配合。

前端页面写法：

```html
	<body>
	  <button id="btn">按钮</button>
	  <script type="text/javascript">
	    var btn = document.getElementById('btn');
	    btn.onclick = function () {
	      //1. 创建一个script标签
	      var script = document.createElement('script');
	      //2. 设置回调函数
	      window.getData = function (data) {
	        console.log(data);//拿到数据
	      }
	      //3. 设置script标签src属性，填写跨域请求的地址
	      script.src = 'http://localhost:3000/jsonp?callback=getData';
	      //4. 将script标签添加到body中生效
	      document.body.appendChild(script);
	      //5.不影响整体DOM结构，删除script标签
	      document.body.removeChild(script);
	    }
	  </script>
	</body>
```

后端写法：

```js
app.get('/jsonp', (req, res) => {
  //解构赋值获取请求参数
  const {callback} = req.query
  //去数据库查找对应数据
  const data = [{name: 'tom', age: 18}, {name: 'jerry', age: 20}];
  res.send(callback + '(' + JSON.stringify(data) + ')');
})
```

**2.后台配置cors解决跨域**

```js
以Node为例：
res.set('Access-Control-Allow-Origin', 'http://localhost:63342');
```

**3.使用代理服务器**
	

	例如：nginx等