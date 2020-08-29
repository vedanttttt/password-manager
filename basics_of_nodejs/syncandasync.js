const fs = require('fs');

//asynchronous = bad wala console.log pehle print kar rha . 
//kyuki req jane ke baad wo wait nahi krta response ka , response ka wait nahi krta.
// fs.readFile(__dirname + '/hello.txt','utf8',(err,data)=>{

//   console.log(data);

// });
// console.log('File Ended Successfully');

//synchornous  
//jab bhi synchornous likhe toh try catch block me likhe 
//synch me callback nahi dena parta 
try{
  const data = fs.readFileSync(__dirname+'/hello.txt','utf8');
  console.log(data);
}
catch(e){
  console.log(e);
}
console.log('File ended succesfully');
