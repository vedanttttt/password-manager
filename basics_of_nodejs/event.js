//create and trigger custom event in node.js
//initially we created events like this
// $('#button').on('click',function(){
//   console.log('First event created');
// });

//to create event ,we have pre-build module
//requiring events
const events = require('events');
//creating object of events
const event = new events.EventEmitter();

event.on('click',(ev)=>{  //click ki jagah kuch bhi likh sakte he 
  console.log(ev);
});

//triggering event
event.emit('click','Tutorials Website nodejs series');  // upar jo he ,uske same hona chahiye


//Practice 
event.on('add',(a,b)=>{
  console.log(a+b);
});
event.emit('add',4,5);

//to create event inside other event
// $('button').on('click',function(){
//   console.log('xyz');
//   test();
// });
// function test(){
//   alert('hello');
// }

//in node.js

const ev2 = new events.EventEmitter();
const first_event = (a,b)=>{
  console.log(a+b);
  ev2.emit('click2',4,5);
}
const sec_event = (a,b)=>{
  console.log('Second event triggered');
  console.log(a*b);
  ev2.emit('click3');
}
const third_event = ()=>{
  console.log('Third event triggered');
}

ev2.on('click2',sec_event);
ev2.on('click3',third_event);
ev2.on('click',first_event);
ev2.emit('click',4,5);
ev2.on('click3',third_event);