
console.log("callee方法输出当前函数体")
console.log(arguments.callee.toString());//或者下边都可

console.log("caller方法获得调用者的函数体");
function f() {
    console.log(f.caller.toString());
}
f();

/*function (exports, require, module, __filename, __dirname) {

    function f() {
        console.log(f.caller.toString());
    }
    f()
}*/
