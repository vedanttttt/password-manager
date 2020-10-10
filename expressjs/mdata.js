//mongoose
//creating schema first and then model
//mongoose does not support es6

//requiring mongoose
var mongoose = require('mongoose');

//creating connection
mongoose.connect('mongodb+srv://vedant:vedant@cluster0.vhrpa.mongodb.net/PROJECT0?retryWrites=true&w=majority',{useNewUrlParser: true});

//creating connection object
var conn = mongoose.connection;

//creating schema,its like a table in mysql
var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalHour: Number,
    total: Number
});

employeeSchema.methods.totalSalary=function(){
    return this.hourlyrate*this.totalHour;
}

//creating model , first parameter is name of table
//consider model like a class in oops
var employeeModel = mongoose.model('Employee', employeeSchema);

//creating new object using new keyword
var employees = new employeeModel({name:'Vedant',email:'info@gmail.com',
etype: 'hourly',
hourlyrate: 10,
totalHour:16
});

//calling method of schema by object
employees.total = employees.totalSalary();

conn.on("connected",function(){
    console.log("Connected Succesfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error',console.error.bind(console,'connection error:'));

conn.once('open',function(){

    //Query to inserting
    employees.save(function(err,res){
        if(err)
            throw error;
        console.log(res);
        conn.close();
    });

    //Query for finding
    // employeeModel.find({},function(err,data){
    //     if(err)
    //         throw error;
    //     console.log(data);
    //     conn.close();
    // });

    // employeeModel.findById({_id: "5f70bccf62e523394c34de46"},function(err,data){
    //     if(err) throw error;
    //     console.log(data);
    //     conn.close();
    // });

    // employeeModel.find({name:"Ayush"},function(err,data){
    //     if(err) throw error;
    //     console.log(data);
    //     conn.close();
    // });

    //Updating
    // employeeModel.findOneAndUpdate({_id: "5f75e9e712c0a249ace9c158"},{name:"Rishabh"},function(err,data){
    //     if(err) throw err;
    //     console.log(data);
    //     conn.close();
    // });

    //Deleting
    // employeeModel.findOneAndDelete({_id: "5f75e9e712c0a249ace9c158"},function(err,data){
    //     if(err) throw err;
    //     console.log(data);
    //     conn.close();
    // });

});