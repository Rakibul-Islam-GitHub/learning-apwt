const express 	= require('express');
const userModel = require.main.require('./models/jobModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/joblist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('job/joblist', {job: results});
	});

});


router.get('/create', (req, res)=>{
	res.render('employer/create');
});


router.post('/create', (req, res)=>{
	
	
			let job={
				comname : req.body.comname,
				title : req.body.title,
				location : req.body.location,
				salary: req.body.salary,
			
				

			};
			userModel.insert(job, function(status){

				if(status){
					console.log('job inserted');
					res.redirect('/employer');
				}else{

				}

			});
});

router.get('/edit/:id', (req, res)=>{

	var user = {
		username: 'test',
		password: 'test',
		
	};
	res.render('employer/edit', user);
});

router.post('/edit/:id', (req, res)=>{
	res.redirect('/employer/joblist');
});

router.get('/delete/:id', (req, res)=>{
	var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};
	res.render('employer/delete', user);
});

router.post('/delete/:id', (req, res)=>{
	res.redirect('/employer/joblist');
});



module.exports = router;