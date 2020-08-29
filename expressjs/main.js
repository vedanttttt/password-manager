//express.js is framework, 
//line of code kam hota he , jese http me server create krne ke liye 10 lagte he to express me 2-3 line me ho jaega

//npm i express , --save nahi likhenge kyuki npm ka version 5 se upar he toh jarurat nhi

const express  = require('express');
const app = express(); // express ke sare methods app me aa jaenge
//console.log(app);

app.get('/',(req,res)=>{
  res.send('Hello world');
});
app.get('/users',(req,res)=>{
  res.send('This is users endpoint');
})

app.listen(3000,()=>console.log('Server running on port 3000'));


//TEMPLATE ENGINE

//to render the view displayed on frontend, we require template engine

//expressjs provides various template engines eg: ejs,hbs,pug,hogon

//mostly used are pug and ejs
//diff btw them is pug me html likhne ka tareeka alag hota he 

