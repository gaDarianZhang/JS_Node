let express = require('express')

let app = express()
app.use(express.static(__dirname+'/public'))

app.get('/test',function (req,res) {
  let personArr = [{name:'peiqi',age:12},{name:'suxi',age:16}];
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //不仅可以解决get的跨域问题，CORS任何请求的跨域问题都能解决。
  //但下面这种就只能解决get post和head这三种简单请求。
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  res.setHeader('Access-Control-Allow-Origin','http://localhost:63348');
  res.send(personArr)
})

app.listen(3000,function (err) {
  if(err) console.log(err)
  else {
    console.log('演示corsp解决跨域服务器，启动成功了！')
    console.log('兄弟，你要用编译器打开网页，因为你要解决跨域问题！')
  }
})