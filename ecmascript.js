//let,const,templating string,class

const a = 40;

function bello(){
  const a =30;
  console.log(a);
}

console.log(a);
bello();

var name="Vedant";
var age=20;

//template literals
console.log("Hi %s you are %s years old.",name,age);

console.log("hi "+name+" your age is "+age );

console.log(`Hi ${name} , your age is ${age}`);

//class
class Users{
  constructor(name,age){
    this.name=name;
    this.age=age;
  }

  getName(){
    return this.name;
  }
  getAge(){
    return this.age;
  }
}

var user = new Users("Pradeep",28);
console.log(user.getName());