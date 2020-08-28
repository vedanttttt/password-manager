//to read the file and print its contents on other file 

 const fs = require('fs');
// fs.readFile(__dirname+"/hello.txt","utf8",(err,data)=>{
// if(err) throw err;
// console.log(data);
// });

const http = require('http');
const server = http.createServer((req,res)=>{

  fs.readFile(__dirname+"/hello.txt","utf8",(err,data)=>{
    
    res.writeHead(200,{'content-type':'text/plain'});
    res.write(data);
    res.end();
  });

}).listen(3000,()=>console.log("Server running on port 3000"));

//to delete the file

// fs.unlink(__dirname+"/hello.txt",(err,data)=>{
// if(err) throw err;
// console.log("File deleted" + data);
// });