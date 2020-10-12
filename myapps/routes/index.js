var express = require('express');
var router = express.Router();
var employeeModel = require('../modules/employee');

var employee = employeeModel.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'Employee Records', records: data });
  });
});

router.post("/",function(req,res,next){

  var empDetails = new employeeModel({
    name : req.body.uname,
    email : req.body.email,
    etype : req.body.emptype,
    hourlyrate : req.body.hrlyrate,
    totalHour : req.body.ttlhr,
    total: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr)
  });

  console.log(empDetails);
  console.log('Hello');
  empDetails.save(function(err,res1){
    if(err) throw err;
    employee.exec(function(err,data){
      if(err) throw err;
      res.render('index',{title: 'Employee Records', records: data});
    });
  });

});

module.exports = router;
