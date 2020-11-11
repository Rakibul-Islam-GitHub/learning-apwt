const express 	= require('express');
const jobModel = require.main.require('./models/jobModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/joblist', (req, res)=>{

	jobModel.getAll(function(results){
		console.log(results[0]);
		let job= {
			comname : results[0].companyname,
			title : results[0].title,
			location : results[0].location,
			salary : results[0].salary,
			image : results[0].image
		}
		console.log(job);
		res.render('job/joblist', {jobs: results});
	});

});


router.get('/create', (req, res)=>{
	res.render('job/create');
});


router.post('/create', (req, res)=>{
	
			let job={
				comname : req.body.comname,
				title : req.body.title,
				location : req.body.location,
				salary: req.body.salary
			
				

			};
			jobModel.insert(job, function(status){

				if(status){
					console.log('job inserted');
					res.redirect('/job/joblist');
				}else{
					res.redirect('/employer');

				}

			});
});

router.get('/edit/:id', (req, res)=>{
	let id= req.params.id;

	jobModel.getById(id, function(results){
		
		let job= results[0];
		  
		  res.render('job/edit', job);
	});
});

router.post('/edit/:id', (req, res)=>{
	

    let job={
		id : req.params.id,
        comname : req.body.comname,
        title : req.body.title,
        location : req.body.location,
        salary: req.body.salary,
    
    
    };
    jobModel.update(job, function(status){

        if(status){
            console.log('job updated');
            res.redirect('/job/joblist');
        }else{

        }

    });

	//res.redirect('/job/joblist');
});

router.get('/delete/:id', (req, res)=>{
	let id= req.params.id;

	jobModel.getById(id, function(results){
		console.log(results[0].name);
		var comname = results[0].companyname;
		var title = results[0].title;
		var location = results[0].location;

		res.render('job/delete', {comname: results[0].companyname, title: results[0].title, location: results[0].location, salary: results[0].salary});

		
	});
	
	
});

router.post('/delete/:id', (req, res)=>{
    let id={
        id : req.params.id

    };

    jobModel.delete(function(id){
        
        res.redirect('/job/joblist');
	});

	
});



module.exports = router;