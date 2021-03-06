# 端口号

> 端口号：1--65535，不建议使用1--199的端口号，这些是预留给系统的，一般使用4位的，4位的也不要用1开头的。

常见端口号：
    21端口：FTP 文件传输服务
    22端口：SSH 端口
    23端口：TELNET 终端仿真服务
    25端口：SMTP 简单邮件传输服务
    53端口：DNS 域名解析服务
    80端口：HTTP 超文本传输服务
    110端口：POP3 “邮局协议版本3”使用的端口
    443端口：HTTPS 加密的超文本传输服务
    1433端口：MS SQL*SERVER数据库 默认端口号
    1521端口：Oracle数据库服务
    1863端口：MSN Messenger的文件传输功能所使用的端口
    3306端口：MYSQL 默认端口号
    3389端口：Microsoft RDP 微软远程桌面使用的端口
    5631端口：Symantec pcAnywhere 远程控制数据传输时使用的端口
    5632端口：Symantec pcAnywhere 主控端扫描被控端时使用的端口
    5000端口：MS SQL Server使用的端口
    27017端口：MongoDB实例默认端口

# 安装问题

- data 和 log文件夹是我安装时指定的数据库的地址和日志地址。bin和其他文件是mongodb的安装文件。

- 使用时，没有使用这个data和log文件夹，而是另外在其他地方创建了数据库。

- mongod是针对我的数据库地址的配置文件，在进行一些其他设置，可以让系统自动启动mongod服务。

    - 在c盘根目录创建如下文件夹（其实就是自己创建的数据库地址，和db同级再建一个log文件夹）

        ​	C:\data\log

        ​	C:\data\db

    - 在MongoDB的安装目录添加一个配置文件

        ​	目录：C:\Program Files\MongoDB\Server\3.2    //mongondb安装地址

        ​	文件：mongod.cfg，内容如下：

        ```json
        systemLog:
            destination: file
            path: D:\MongoDB\dataBase\log\mongod.log
        storage:
            dbPath: D:\MongoDB\dataBase\db
        net:
            port: 27017
        ```

    - 以管理员身份打开命令行窗口，执行以下指令 （根据我的数据库地址不同自己配置）

        ```c
        sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.2\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
        ```

        - 如果无法启动服务，在管理员的命令行窗口中输入如下指令，再重复以上命令

            ``sc delete MongoDB``

        - 如果再重复``sc.exe``命令失败，关闭cmd，在任务管理器中关闭mongodb服务，再次尝试。

    - 打开``系统服务器(任务管理器-》服务)``，启动名为MongoDB的服务	

    - 如果无法启动服务，在管理员的命令行窗口中输入如下指令``sc delete MongoDB``



# mongodb简单命令

1. db : 查看当前在操作哪一个数据库
2. show dbs ：查看数据库列表（一共有几个数据库，备注：如果数据库为空，不出现在列表中）
3. use test :切换到test数据库，如果不存在，则创建一个test库
4. db.students.insert() ：向当前数据库的students集合中插入一个文档。
5. show collections ：展示当前数据库中所有的集合。

数据库——》集合——》一条文档——》字段

# 原生CRUD命令总结

- -C creat：
    - ``db.集合名.insert(文档对象)``既能当做insertOne用，又能当做insertMany用
    
    - ``db.集合名.insertOne(文档对象)``

    - ``db.集合名.insertMany([文档对象，文档对象])``
    
    - ```js
        db.students.insert({name:"zhangsan",age:18,gender:"男",grade:"高三",stuId:"001"});
        db.students.insert([{name:"meimei",age:17,gender:"女",grade:"研三",stuId:'000'},{name:"meimei",age:20,gender:"女",grade:"研一",stuId:'009'}]);
        db.students.insertOne({name:"lsi",age:18,gender:"女",grade:"高三",stuId:"002"});
        db.students.insertMany([
        	{name:"王五",age:10,grade:"高一",gender:"double",stuId:"101"},
        	{name:"赵六",age:11,gender:"男",grade:"高二",stuId:"89"}
        ]);
        ```
    
        
    
- -R read：

    - ``db.集合名.find(查询条件[,投影])`` 

    - ``db.集合名.findOne(查询条件[,投影])，默认只要找到一个``
            举例:``db.students.find({age:18}),``查找年龄为18的所有信息
            举例:``db.students.find({age:18,name:'jack'})``,查找年龄为18且名字为jack的学生

    - 投影：过滤掉不想要的数据，只保留想要展示的数据。<span style="color:red;font-weight:bold">**\_id可以和其他混用，除\_id外，其他只能都为1，或都为0**</span>
            举例：``db.students.find({},{_id:0,name:0})``,过滤掉id和name
            举例：``db.students.find({},{age:1}),只保留age``

    - 常用操作符：

        - ```js
            1. < , <= , > , >= , !==   对应为： $lt $lte $gt $gte $ne
            	举例：db.集合名.find({age:{$gte:20}}),年龄是大于等于20的
            2.逻辑或：使用$in 或 $or
                $in $or冒号后都是跟的[]
                查找年龄为18或20的学生
                举例：db.students.find({age:{$in:[18,20]}})
                举例：db.students.find({$or:[{age:18},{age:20}]})
            3.逻辑非：$nin
            4.正则匹配：
            	举例：db.students.find({name:/^T/})
            5.$where能写函数：
                db.students.find({$where:function(){
                	return this.name === 'zhangsan' && this.age === 18
                }})
            ```
            
            ```js
            db.students.find({age:18,gender:"女"});
            //大于小于
            db.students.find({age:{$lt:18,$gt:10}});
            //或
            db.students.find({age:{$in:[18,11]}});
            db.students.find({$or:[{age:18},{age:11}]});
            //db.students.find({$in:[{age:11},{age:10}]});这样不行
            //非
            db.students.find({age:{$nin:[18,10]}});
            //正则
            db.students.find({name:/王/})
            ```
            
            

- -U update：

    - ``db.集合名.update(查询条件,要更新的内容[,配置对象])``

    -  补充：``db.集合名.updateOne(查询条件,要更新的内容[,配置对象])``
                             ``db.集合名.updateMany(查询条件,要更新的内容[,配置对象])``

    - ```js
        //如下会将更新内容替换掉整个文档对象，但_id不受影响,也即是其他的字段会丢失
            举例：db.students.update({name:'zhangsan'},{age:19})
            
        //使用$set修改指定内容，其他数据不变，不过只能匹配一个zhangsan
            举例：db.students.update({name:'zhangsan'},{$set:{age:19}})
            
        //修改多个文档对象，匹配多个zhangsan,把所有zhangsan的年龄都替换为19
            举例：db.students.update({name:'zhangsan'},{$set:{age:19}},{multi:true})
        ```
        
        ```js
        //db.students.update({name:"zhangsan"},{age:19});//这样的话，其他的信息都丢了
        db.students.update({gender:"男"},{$set:{age:20}},{multi:true});
        ```
        
        

- -D delete

    - ``db.集合名.remove(查询条件)``

    - ```js
        //删除所有年龄小于等于19的学生
            举例：db.students.remove({age:{$lte:19}})
        ```

        



# mongoose的CRUD方法总结

> Mongoose是一个对象文档模型（ODM）库，它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。
>
> ```
> 为什么用mongoose？ 想在Node平台下，更加简单、高效、安全、稳定的操作mongoDB
> ```

- 优势

    1) 可以为文档创建一个模式结构（Schema）

    2) 可以对模型中的对象/文档进行验证

    3) 数据可以通过类型转换转换为对象模型

    4) 可以使用中间件来应用业务逻辑挂钩

    5) 比Node原生的MongoDB驱动更容易

- -Create

  模型对象.create(文档对象，回调函数)
  模型对象.create(文档对象)

  备注：可以将多个文档对象放在一个数组内

  > mongoDB原生里边有insert、insertOne和insertMany

- -Read

  模型对象.find(查询条件[,投影]，回调)不管有没有数据，都返回一个数组
  模型对象.findOne(查询条件[,投影]，回调)找到了返回一个对象，没找到返回null

  > mongoDB原生里边有find和findOne

- -Update

  模型对象.updateOne(查询条件,要更新的内容[,配置对象]，回调)
  模型对象.updateMany(查询条件,要更新的内容[,配置对象]，回调)
  备注：存在update方法，但是即将废弃，查询条件匹配到多个时，依然只修改一个，强烈建议用	updateOne或updateMany

  > mongoDB原生有update、updateOne和updateMany

- -Delete

	模型对象.deleteOne(查询条件，回调)
	模型对象.deleteMany(查询条件，回调)
	备注：没有delete方法，会报错！
	
	> mongoDB原生里边有remove

备注： 以上所有方法，如果没有指定回调函数，则返回值是一个Promise对象

```js
  //新增操作 -------- C --------
  stuModel.create({
    stu_id:'001',
    name:'李欣',
    age:13,
    sex:'男',
    hobby:['女','打代码','打篮球'], //限制爱好只能为数组，数组中的每一项必须为字符串
    info:'一个风一样的男子', //接收所有类型
  },function(err,data){
      if (!err) console.log(data)
      else console.log(err)
  });

  //查询 ---------- R ----------
  /*find方法：
      1.返回的是一个数组，就算是一条数据，也包裹一个数组
      2.若查询结果为空，则返回一个空数组。
  */
  /*stuModel.find({name:'金龙老师'},function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })*/
  /*findOne方法：
      1.若有结果，返回的是一个对象
      2.若没有结果，返回一个null
  */
  /*stuModel.findOne({name:'班长'},{age:1,_id:0},function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })*/

  //更新 ----------- U -------------
  /*stuModel.updateOne({name:'静静'},{age:16},function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })*/

  //删除 ----------- D ---------------
  /*stuModel.deleteMany({age:16},function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })*/
}
```

- 注意：
    - <span style="color:orange;">回调函数内的err和data参数，由内容的话就是内容，没内容的话是null。</span>