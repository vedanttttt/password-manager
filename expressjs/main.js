//express.js is framework, 
//line of code kam hota he , jese http me server create krne ke liye 10 lagte he to express me 2-3 line me ho jaega

//npm i express , --save nahi likhenge kyuki npm ka version 5 se upar he toh jarurat nhi

const express  = require('express');
const app = express(); // express ke sare methods app me aa jaenge
//console.log(app);

//to serve static files = in public folder
//this is middleware
//app.use(express.static('public'));

//to use virtual path which doesnt exist in real but we use it so that outsider cannot know actual path
//we can use anything else also in place of static
app.use('/static',express.static('public'));

//sending static file = index.html
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html');
});
// app.get('/users',(req,res)=>{
//   res.send('This is users endpoint');
// });
// app.post('/users/login',(req,res)=>{
//   res.send('This is login endpoint');
// });

//it is necessary to write this listen one
app.listen(3000,()=>console.log('Server running on port 3000'));


//TEMPLATE ENGINE

//to render the view displayed on frontend, we require template engine

//expressjs provides various template engines eg: ejs,hbs,pug,hogon

//mostly used are pug and ejs
//diff btw them is pug me html likhne ka tareeka alag hota he 

// express generator

//gives dummy application 


//route with parameters
app.get('/users/:idd?',(req,res)=>{  //? lagane se, agar idd nahi bhi di he tab bhi error nahi ayega , wo users tak ka dikhaega or agar idd di he tab toh badhiya he
  // ? batata he ki wo cheez optional he 
  if(!req.params.idd){
    res.send('Users data accessed');
  }
  else{
  console.log(req.params.idd);
  res.send('Users data accessed ' + req.params.idd);
  }
});


// app.get('/users/:id/cool/:cid',(req,res)=>{
//   res.send(req.params.id + " coolid " + req.params.cid);
//   //res.send('I am cool');
// });

app.get('/flights/:From?.:To?',(req,res)=>{ // (.) ki jagah (-) bhi laga sakte he
  console.log(req.params);
  res.send('Search for flights from ' + req.params.From + ' to ' + req.params.To);
});

