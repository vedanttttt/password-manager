// prototype is same like inheritance in oops

//making class
var student = function(){  // or   function student(){}
  this.name = "Pradeep";
  this.age = 27;
  this.email = "info@gmail.com";
}

student.prototype={
  address : "Delhi",
  getName : function(){
    return this.name;
  }
}

var stud = new student();
console.log(stud);