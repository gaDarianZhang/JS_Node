// setImmediate(() => {
//   console.log('timeout1')
//   Promise.resolve().then(() => console.log('promise resolve'))
//   process.nextTick(() => console.log('next tick1'))
// });
// setImmediate(() => {
//   console.log('timeout2')
//   process.nextTick(() => console.log('next tick2'))
// });
// setImmediate(() => console.log('timeout3'));
// setImmediate(() => console.log('timeout4'));

//old: timeout1=>timeout2=>timeout3=>timeout4=>next tick1=>next tick2=>promise resolve
//new: timeout1=>next tick1=>promise resolve=>timeout2=>next tick2=>timeout3=>timeout4

// console.log('start')
// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function() {
//     console.log('promise1')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
//   Promise.resolve().then(function() {
//     console.log('promise2')
//   })
// }, 0)
// Promise.resolve().then(function() {
//   console.log('promise3')
// })
// console.log('end')
//node10:start=>end=>promise3=>timer1=>timer2=>promise1=>promise2  
//node11之后: start end promise3 timer1 promise1 timer2 promise2


// 这个说法有点问题，我的理解是：
// 老版的：每到达一个阶段，就要把这个阶段的任务执行完，即使这个阶段的都是宏任务，而且在我这些宏任务还没执行完的时候已经产生了微任务，是不会进入下一个阶段的。而且，nextTick也确实是在一个循环之后被清空，而且在其他微任务之前。
// 新版的：在每个阶段，执行一个宏任务，如果产生了微任务，就去执行微任务，而且就是在这个阶段执行的。或者是，每个阶段的微任务放在了自己阶段。

// setTimeout(()=>{
//   console.log('timer1')
//   Promise.resolve().then(function() {
//       console.log('promise1')
//   })
// }, 0)
// setTimeout(()=>{
//   console.log('timer2')
//   Promise.resolve().then(function() {
//       console.log('promise2')
//   })
// }, 0)
//new：timer1 promise1 timer2 promise2
//old: timer1 timer2 promise1 promise2


// setImmediate(() => console.log('immediate1'));
// setImmediate(() => {
//     setTimeout(()=>{
//       console.log("setTimeout");
//     })
//     console.log('immediate2')
//     Promise.resolve().then(() => console.log('promise resolve'))
// });
// setImmediate(() => console.log('immediate3'));
// setImmediate(() => console.log('immediate4'));



// setTimeout(()=>{
//   console.log('setTimeout所指定的回调函数执行了')
// })

// setImmediate(()=>{
//    console.log('我是setImmediate指定的回调') 
//    process.nextTick(()=>{
//     console.log('内部的process.nextTick')
//   })
// })

// process.nextTick(()=>{
//    console.log('process.nextTick所指定的回调执行了')
// })

// Promise.resolve().then(
//   value=>{console.log("promise");}
// )
// console.log('我是主线程上的代码')

