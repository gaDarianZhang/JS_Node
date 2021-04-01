## npm使用简介

一、【搜索】：
      1.npm search xxxxx
      2.通过网址搜索：www.npmjs.com

二、【安装】：(安装之前必须保证文件夹内有package.json，且里面的内容格式合法)

1. `npm install xxxxx --save   或   npm i xxxx -S   或   npm i xxxx`

    备注：
    (1).局部安装完的第三方包，放在当前目录中node_modules这个文件夹里
    (2).安装完毕会自动产生一个package-lock.json(npm版本在5以后才有)，里面缓存的是每个下载过的包的地址，目的是下次安装时速度快一些。
    (3).当安装完一个包，该包的名字会自动写入到package.json中的【dependencies(生产依赖)】里。npm5及之前版本要加上--save后缀才可以。

2. `npm install xxxxx --save-dev  或  npm i xxxxx -D  安装包并将该包写入到【devDependencies(开发依赖中)】`
    	备注：什么是生产依赖与开发依赖？
        1.只在开发时(写代码时)时才用到的库，就是开发依赖 ----- 例如：语法检查、压缩代码、扩展css前缀的包。
        2.在生产环境中(项目上线)不可缺少的，就是生产依赖 ------ 例如：jquery、bootStrap等等。
        3.注意：某些包即属于开发依赖，又属于生产依赖 -------例如：jquery。

3. `npm i xxxx -g  全局安装xxxx包`
    1. （一般来说，<span style="color:red;">带有指令集的包要进行全局安装，例如：browserify、babel等</span>）
            <span style="color:red;">全局安装的包，其指令到处可用(只是它的指令到处可用，并不能直接require)</span>，如果该包不带有指令，就无需全局安装。
4. `npm root -g`查看全局安装的位置

5. `npm i xxx@yyy `:安装xxx包的yyy版本

6. `npm i `：安装package.json中声明的所有包

三、【移除】：
      `npm remove xxxxx`  在node_module中删除xxxx包，同时会删除该包在package.json中的声明

四、【其他命令】：
	1.npm aduit fix :检测项目依赖中的一些问题，并且尝试着修复。

​	2.npm view xxxxx versions :查看远程npm仓库中xxxx包的所有版本信息

​	3.npm view xxxxx version :查看npm仓库中xxxx包的最新版本。

​	4.npm ls xxxx :查看我们所安装的xxxx包的版本，<span style="color:red;font-weight:bold">不要被package.json里边的版本号给坑了。</span>

​	5.npm list：查看所有已安装的 npm 软件包（包括它们的依赖包）的最新版本

​    6.npm list -g：查看已安装的全局环境下的 npm 软件包（包括它们的依赖包）的最新版本

​	7.npm list XXX：也可以通过指定名称来获取特定软件包的版本，就是npm ls 命令。

​	8.npm root -g：查看全局模块的安装位置

 五、【关于版本号的说明】：
      <span style="color:red;">"^3.x.x" ：锁定大版本，以后安装包的时候，保证包是3.x.x版本，x默认取最新的。</span>
     <span style="color:red;"> "~3.1.x" ：锁定小版本，以后安装包的时候，保证包是3.1.x版本，x默认取最新的。</span>
      <span style="color:red;">"3.1.1" ：锁定完整版本，以后安装包的时候，保证包必须是3.1.1版本。</span>



## cnpm的简介与使用

### 1.国内使用npm存在的问题

* 安装npm后，每次我们安装包时，我们的电脑都要和npm服务器进行对话，去npm仓库获取包。
* npm默认的仓库地址为：http://registry.npmjs.org 
* 查看当前npm仓库地址命令：``` npm config get registry ```，提示如下图：
    ![Alt text](https://s2.ax1x.com/2019/01/08/FqtKhR.png)

* 因为npm的远程服务器在国外，所以有时候难免出现访问过慢，甚至无法访问的情况。
* 为了解决这个问题，我们有以下几个解决办法

### 2.使用淘宝的cnpm代替npm

> 淘宝为我们搭建了一个国内的npm服务器，它目前是每隔10分钟将国外npm仓库的所有内容“搬运”回国内的服务器上，这样我们直接访问淘宝的国内服务器就可以了，它的地址是：https://registry.npm.taobao.org

### 使用方法：

#### 第一种：直接安装cnpm

安装淘宝提供的cnpm，并更改服务器地址为淘宝的国内地址，
命令：``` npm install -g cnpm --registry=https://registry.npm.taobao.org ```，以后安装直接采用```cnpm```替代```npm```，
例如原生npm命令为：```npm install uniq --save```，cnpm命令为：```cnpm install uniq --save```

#### 第二种：替换npm仓库地址为淘宝镜像地址（推荐）

命令：```npm config set registry https://registry.npm.taobao.org```，
查看是否更改成功：```npm config get registry ```，以后安装时，依然用npm命令，但是实际是从淘宝国内服务器下载的



## yarn的简介与使用

> Yarn发布于2016年10月，截至当前2019年1月，gitHub上的Start数量为：34.3k，已经超过npm很多了，
> yarn使用本地缓存，有时甚至无需互联网连接就能安装本地已经缓存过的依赖项，安装方法：```npm install -g yarn```

#### 特别注意！

由于yarn的全局安装位置与npm不同，所以要配置yarn的全局安装路径到环境变量中，否则全局安装的包不起作用。
具体操作如下：

> 安装yarn后分别执行 ```yarn global dir```命令，```yarn global bin```命令。
> 将上述两步返回的路径配置到电脑环境变量中即可。

### yarn命令与npm命令的对应关系如下：

#### 初始化项目: 

	yarn init -y
	npm init -y

#### 下载项目的所有声明的依赖: 

	yarn
	npm install

#### 下载指定的运行时依赖包: 

	yarn add xxxx@3.2.1
	npm install xxxxx@3.2.1 -S

#### 下载指定的开发时依赖: 

	yarn add xxxxx@3.2.1 -D
	npm install xxxxx@3.2.1 -D

#### 全局下载指定包: 

	yarn global add xxxxxx
	npm install xxxxxxx -g

#### 删除依赖包: 

	yarn remove xxxxx
	yarn global remove xxxxxx
	npm remove xxxxxxx -g

#### 查看某个包的信息: 

	yarn info xxx
	npm info xxx

#### 查看全局模块安装位置

```
yarn global dir
npm root -g
```

#### 查看本项目安装的模块

````
yarn list
npm list
````

#### 查看全局安装的模块

````
yarn global list
npm list -g
````

#### 设置淘宝镜像: 

	yarn config set registry https://registry.npm.taobao.org
	npm config set registry https://registry.npm.taobao.org

