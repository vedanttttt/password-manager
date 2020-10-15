var express = require('express');
var router = express.Router();
var employeeModel = require('../modules/employee');

var employee = employeeModel.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'Employee Records', records: data,success: '' });
  });
});

router.post("/",function(req,res,next){

  var empDetails = new employeeModel({
    name : req.body.uname,
    email : req.body.email,
    etype : req.body.emptype,
    hourlyrate : req.body.hrlyrate,
    totalHour : req.body.ttlhr,
   // total: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr)
  });

  console.log(empDetails);
  console.log('Hello');
  empDetails.save(function(err,res1){
    if(err) throw err;
    employee.exec(function(err,data){
      if(err) throw err;
      res.render('index',{title: 'Employee Records', records: data,success: 'Record Inserted Successfully'});
    });
  });

});

router.post('/search',function(req,res,next){

  var flrtName = req.body.flrtname;
  var fltrEmail = req.body.fltremail;
  var fltrType = req.body.fltremptype;

  if(flrtName!='' && fltrEmail!='' && fltrType!=''){

    var filterParameter={ $and:[{name : flrtName},
    {$and:[{email:fltrEmail},{etype:fltrType}]}
    ] 
    }
  }
  else if(flrtName!='' && fltrEmail=='' && fltrType!=''){

    var filterParameter={$and:[{name:flrtName},{etype:fltrType}]}
  }
  else if(flrtName=='' && fltrEmail!='' && fltrType!=''){

    var filterParameter={$and:[{email:fltrEmail},{etype:fltrType}]}
  }
  else if(flrtName=='' && fltrEmail=='' && fltrType!=''){

    var filterParameter={etype:fltrType}
  }
  else{
    var filterParameter={}
  }

  var employeeFilter = employeeModel.find(filterParameter);

  employeeFilter.exec(function(err,data){
    if(err) throw err;
    res.render('index',{title: 'Employee records',records :data});
  });
});

router.get('/delete/:id',function(req,res,next){

  var id = req.params.id;
  var del = employeeModel.findByIdAndDelete(id);

  del.exec(function(err){
    if(err)throw err;
    employee.exec(function(err,data){
      if(err) throw err;
      res.render('index',{title: 'Employee Records', records: data,success: 'Record Deleted Successfully'});
    });
  });
});

router.get('/edit/:id',function(req,res,next){

  var id = req.params.id;
  var edit = employeeModel.findById(id);

  edit.exec(function(err,data){
    if(err) throw err;
    res.render('edit',{title: 'Edit Employee Records',records:data});
  });
});

router.post('/update',function(req,res,next){

  var update = employeeModel.findByIdAndUpdate(req.body.id,{
    name : req.body.uname,
    email : req.body.email,
    etype : req.body.emptype,
    hourlyrate : req.body.hrlyrate,
    totalHour : req.body.ttlhr,
    //total: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr)
  });

  update.exec(function(err,data){
    if(err) throw err;
    employee.exec(function(err,data){
      if(err) throw err;
      res.render('index',{title: 'Employee Records', records: data,success: 'Record Updated Successfully'});
    });
  });
});

module.exports = router;
