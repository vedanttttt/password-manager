var express = require('express');
var multer = require('multer');
var path = require('path');//for giving path while file upload along with multer
//using jwt for authentication
var jwt = require('jsonwebtoken');
var router = express.Router();
var employeeModel = require('../modules/employee');
var uploadModel = require('../modules/upload');
const { LocalStorage } = require('node-localstorage');
var employee = employeeModel.find({});
var imageData = uploadModel.find({});

router.use(express.static(__dirname + './public'));

//requiring node-localstorage
if(typeof localStorage === 'undefined' || localStorage === null){
  var localStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

//function to go in multer and get destiantion and file name
var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req,file,cb)=>{
    cb(null,file.fieldname + '_'+Date.now() + path.extname(file.originalname))
  }
});

//middleware
var upload = multer({
  storage: Storage
}).single('file');

/* GET home page. */

//for upload , get and post

router.post('/upload',upload /*this upload is of middleware upload,u can also use another name*/,function(req, res, next) {
  var imageFile = req.file.filename;
  var success = req.file.filename + " Uploaded successfully";

  var imageDetails = new uploadModel({
    imagename : imageFile
  })
  //for saving file in database
  imageDetails.save(function(err,doc){
    if(err) throw err;

    imageData.exec(function(err,data){
      if(err) throw err;
      res.render('upload-file', { title: 'Upload File',records: data,success: success });
    });
  });
});

  function checkLogin(req,res,next){
    var myToken = localStorage.getItem('myToken');
    try{
      jwt.verify(mytoken, 'loginToken');
    }
    catch(err){
      res.send('You need to login first');
    }
    next();
  }

router.get('/upload', function(req, res, next) {
    imageData.exec(function(err,data){
      if(err) throw err;
      res.render('upload-file', { title: 'Upload File',records: data,success: '' });
    });
  });

router.get('/',checkLogin, function(req, res, next) {
  employee.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'Employee Records', records: data,success: '' });
  });
});

router.get('/login', function(req, res, next) {
  var token = jwt.sign({foo: 'bar'}, 'loginToken');
  localStorage.setItem('myToken',token);
  res.send('Login Successfull');
});

router.get('/logout', function(req, res, next) {
  
  localStorage.removeItem('myToken');
  res.send('Logout Successfull');
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
