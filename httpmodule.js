const http = require('http');
const server = http.createServer((req,res)=>{
  res.writeHead(200,'Content-Type:text/html');
  res.write("<b><h1>Node Js Tutorials Running</h1></b>");
  res.end();
}).listen(3000,()=>console.log('Server running on port 3000'));   //create server is predefined event or function in http module

//nodemon will be installed by  npm i -g nodemon