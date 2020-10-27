var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Management System' });
});

router.get('/signup',function(req,res,next){
	res.render('signup',{title: 'Signup Page'});
});

router.get('/passwordCategory',function(req,res,next){
	res.render('password_category',{title: 'Password Category'});
});

router.get('/add-new-category',function(req,res,next){
	res.render('addNewCategory',{title: 'Password Category'});
});

router.get('/add-new-password',function(req,res,next){
	res.render('addNewPassword',{title: 'Password Category'});
});

router.get('/view-all-password',function(req,res,next){
	res.render('viewAllPassword',{title: 'Password Category'});
});

module.exports = router;
