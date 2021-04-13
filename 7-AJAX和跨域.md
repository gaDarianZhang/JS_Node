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
- xhr.readyState:
    - 0:xhr对象在实例化出来的那一刻，就已经是0状态，代表着xhr是初始化状态。
    - 1:send方法还没有被调用，即：请求没有发出去，此时依然可以修改请求头。
    - 2:send方法被调用了，即：请求已经发出去了，此时已经不可以再修改请求头。！！！！<span style="color:red">貌似是服务器端已经作出回复，并不是说请求发出去后就是状态2</span>！！！！
    - 3:已经回来一部分数据了，如果是比较小的数据，会在此阶段一次性接收完毕,较大数据，有待于进一步接收。
    - 4:数据完美的回来了。
- xhr.abort()
    - 如果来得及（浏览器端根本没发出请求），半路取消，请求根本没有到达服务器。
    - 如果来不及（浏览器端已经发出了请求了），拒之门外，请求已经到达了服务器，且服务器已经给出响应。
    - 也存在根本不起作用的情况(服务器的返回已经收到，abort没用了)。

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

> 浏览器的策略本质是：一个域名下面的JS，没有经过允许是不能读取另外一个域名的内容，但是浏览器不阻止你向另外一个域名发送请求。
>
> 所以form表单提交没有跨域问题，提交form表单到另外一个域名，原来页面是无法获取新页面的内容，或者说form提交后不需要返回，但是ajax是需要返回的。
>
> 而ajax是想要读取响应内容，浏览器是不允许你这么做的。
>
> 世界本无跨域，是浏览器不允许js访问别的域，但是浏览器却没有限制自己，img标签和script标签都是可以加载其他域的图片或者js文件。这不就是jsonp的跨域嘛，利用浏览器的历史兼容性。
>
> 浏览器的安全策略限制的是js脚本，并不限制src，form表单提交之类的请求。就是说form表单提交不存在安全问题，ajax提交跨域存在安全问题。

- <span style="color:orange;">发送的ajax请求走的是浏览器的ajax引擎，严格遵守同源策略。</span>
- <span style="color:orange;">form表单发出的请求走的不是ajax引擎，是浏览器的其他模块，不受同源策略限制。</span>
- <span style="color:red;font-weight:bold;font-size:18px">form表单不受限制的原因是：</span>
    - form表单站在63348端口向3000端口发送请求后，如果有数据返回（如果是重定向的话，可以直接定到其他网站。至于后边会不会产生跨域，就看在这个网站上发送的请求了，和我现在的就没关系了），那么返回数据显示的页面地址就刷新到了3000端口。而我通过ajax在63348端口向3000端口发送请求，由于页面无刷新获取数据，也就是获取数据后，数据还是返回给63348端口的，这就产生了跨域。

### 4.如何在开发中解决跨域问题：

**1.JSONP解决发送请求跨域问题： <span style="color:skyblue">json with padding</span>**

> 要明确的是：JSONP不是一种技术，而是程序员“智慧的结晶”（利用了标签请求资源不受同源策略限制的特点）
> JSONP需要前后端人员互相配合。

前端页面写法：

- 1. 在全局作用域定义一个函数，函数作用就是传入一个参数，然后函数体内就是对这个参数的操作

- 2. 在DOM中添加一个script标签，url中以查询字符串形式带上前一步定义的这个函数名。

- 3. 在服务器端取出url中的函数名，把这次请求需要的数据放在一个对象data内，并res.send一段字符串:

        ```js
        (`${functionName}(${JSON.stringfy(data)})`)
        ```

```js

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



//jQuery写法
//完整写法
    // $.ajax({
    //   url:'http://localhost:3000/test',
    //   method:'get',
    //   dataType:'jsonp', //该属性，控制了上面的4步
    //   data:{name:'zhangsan',age:18},
    //   success:function (result,statusText,XHR) {
    //     console.log(result);
    //     console.log(statusText,XHR);
    //   },
    //   error:function (err) {
    //     console.log(err)
    //   }
    // })
    
    //精简写法:注意要自己再url中加上“?callback=?”
    $.getJSON('http://localhost:3000/test?callback=?',{name:'zhangsan',age:18},function (data,textStatus,xhr) {
      console.log(data);
      console.log(textStatus,xhr);
    })
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

**2.后台配置cors解决跨域 <span style="color:skyblue">cross-origin resource share</span>**

```js
以Node为例：只能解决get post head请求
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
```

**3.使用代理服务器**
	

	例如：nginx等