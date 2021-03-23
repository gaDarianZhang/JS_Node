# Node.js

## Node中函数的特点

- Node中任何一个模块（js文件）都被一个外层函数所包裹

    - ```js
        function (exports, require, module, __filename, __dirname) {}
        exports：用于支持CommonJs模块化规范的暴露语法
        require：用于支持CommonJs模块化规范的引入语法
        module：用于支持CommonJs模块化规范的暴露语法
        __filename：当前运行文件的绝对路径
        __dirname：当前运行文件所在文件夹的绝对路径
        ```

- 为什么要设计这个外层函数（这个外层函数有什么作用？）
        1).用于支持模块化语法
        2).隐藏服务器内部实现(从作用域角度去看)

## Node中的Global

- 浏览器端。js由那几部分组成
    1. BOM ----> window 浏览器对象模型 -------- 很多的API（location，history）
    2. DOM ----> document 文档对象模型 ---------- 很多的API（对DOM的增删改查）
    3. ES规范 -------------------- ES5、ES6.....
- Node端，js由哪几部分组成
    1. 没有了BOM ----->  因为服务器不需要（服务端没有浏览器对象）
    2. 没有了DOM ----->  因为没有浏览器窗口
    3. 几乎包含了所有的ES规范
    4. 没有了window，但是取而代之的是一个叫做global的全局变量。

### global

- 在Node中禁止函数的this指向global，而是指向了一个空对象。
- 