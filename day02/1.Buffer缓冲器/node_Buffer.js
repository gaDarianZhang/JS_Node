/*
* 1.Buffer是什么？
*    1.它是一个【类似于数组】的对象，用于存储数据（存储的是二进制数据）。
*    2.Buffer的效率很高，存储和读取很快，它是直接对计算机的内存进行操作。
*    3.Buffer的大小一旦确定了，不可修改。
*    4.每个元素占用内存的大小为1字节。
*    5.Buffer是Node中的非常核心的模块，无需下载、无需引入,直接即可使用
*
* 2.进制相关
*
*     十六进制：00 -------- ff
*     二进制：00000000 ------ 11111111
*
* 3. 计算机单位换算
*       8位(bit) = 1字节(Byte)
*       1024Byte = 1Kb
*       1024KB = 1Mb
*       1024Mb = 1Gb
*       .....
* */

//创建一个Buffer的实例对象--------性能特别差------1.在堆里开辟空间（包括从来没被使用过的以及使用过但被回收为垃圾的空间）。2.多了个清理的步骤
let buf = new Buffer(10)
console.log(buf)

//创建一个Buffer的实例对象--------性能比new Buffer()稍强一点------在堆中开辟一块空间(该块空间没有人用过)
let buf2 = Buffer.alloc(10)
console.log(buf2)

//创建一个Buffer的实例对象-------性能最好的-------在堆里开辟空间
/*
* 1.输出的Buffer为什么不是二进制？ ----- 输出的是16进制，但是存储的是二进制吗，输出的时候会自动转16进制。
* 2.输出的Buffer不为空？ ----- 在堆里开辟空间，可能残留着别人用过的数据，所以allocUnsafe
* */
let buf3 = Buffer.allocUnsafe(10)
console.log(buf3)
console.log(buf3.toString())

// 将数据存入一个Buffer实例
let buf4 = Buffer.from('hello atguigu')
console.log(buf4.toString())
console.log(buf4)

let buf5 = Buffer.from("中文");
console.log(buf5,buf5.toString());
/*
* 1.输出的为什么不是我们曾经存入的字符串？用户存储的不一定是字符串，可能是媒体类型的文件
* 2.如何能够让输出的东西是字符串(我们能看懂的)？toString()
* */
