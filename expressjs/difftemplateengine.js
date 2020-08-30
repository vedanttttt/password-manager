const express = require('express');
const app = express();

//Using different template engine
//Using pug = npm i pug
//Using ejs = npm i ejs
//Another one is twig = npm i twig

//app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views','./public/views');

app.get('/',(req,res)=>{

  //when we were sending file,we used res.sendFile but when we are using template engines, we use res.render
  res.render('index',{title: 'Learning',message: 'Hello World'});
});


app.listen(3000,()=>console.log('Server running on port 3000'));