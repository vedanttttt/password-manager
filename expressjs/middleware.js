//server and user ke beech , middleware acts as a security 
//agar req gyi or response aya or agar wo match karega tab theek he , warna hum ek naya message print karaega . 
//next() se jahan jana chahiye wahan jata he . 

const express = require('express');

const app = express();


var validation = (req,res,next)=>{
  console.log('Middleware working');
  next();
}

var userValidation = (req,res,next)=>{
  if(req.params.username === 'vedant')
  console.log('User middleware working ' + req.params.username);
  else
    console.log('User not authorized');
  next();  // agar next ko comment kar de to wo ghumta rahega loading wala kyuki usko nahi pata jana kahan he
}

//put it outside to use it globally for all routes
//app.use(validation);
// app.get('/',(req,res)=>{
//   res.send('This is trial');
// });

//put validation inside so only / route can use it . 
//we can make middlewares for each specific route also
app.get('/',validation,(req,res)=>{
  res.send('This is trial');
});

app.get('/users/:username',userValidation,(req,res)=>{
  res.send('Trial for users'); // res.send likhna jaruri hota he ,issi se end hota he response
});

//external middleware
const ext = require('./mymiddleware');
app.get('/ex',ext,(req,res)=>{
  res.send('Hello');
});



app.listen(3000,()=>console.log('Server running on port 3000'));