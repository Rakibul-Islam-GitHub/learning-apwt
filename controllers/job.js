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
		res.render('job/joblist', {job: results});
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
				salary: req.body.salary,
			
				

			};
			jobModel.insert(job, function(status){

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
	res.render('job/edit', user);
});

router.post('/edit/:id', (req, res)=>{

    let job={
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

	res.redirect('/job/joblist');
});

router.get('/delete/:id', (req, res)=>{
	
	res.render('job/delete', user);
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