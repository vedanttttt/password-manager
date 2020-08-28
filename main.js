//objects
var users = {
  name: "Vedant",
  age: 20,
  email: "bhaiya@gmail.com"
}

console.log(users.name);

//anonymous function AND arrow function
var person = (a) => {
  console.log('Hello',a);
}

person(4);

var name = "Vedant";

module.exports.abc = name;