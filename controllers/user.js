const express 	= require('express');
const userModel		= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/create', (req, res)=>{
	res.render('admin/create');
});


router.post('/create', (req, res)=>{
	
	
			let user={
				name : req.body.name,
				company : req.body.company,
				contact : req.body.contact,
				username: req.body.username,
				password: req.body.password
				

			};
			userModel.insert(user, function(status){

				if(status){
					console.log('user inserted');
					res.redirect('/home');
				}else{

				}

			});
});

router.get('/edit/:id', (req, res)=>{
	let id= req.params.id;

	userModel.getById(id, function(results){
		console.log(results[0].name);
		var empname = results[0].name;
		var empcompany = results[0].company;
		var empcontact = results[0].contact;
		var empusername = results[0].username;
		var emppassword = results[0].password;


		res.render('admin/edit', {name: empname, company: empcompany, contact: empcontact, username: empusername, password: emppassword});

		
	});
  
});

router.post('/edit/:id', (req, res)=>{

	let user={
		id : req.params.id,
		name : req.body.name,
		company : req.body.company,
		contact : req.body.contact,
		username: req.body.username,
		password: req.body.password
		

	};
	console.log(user);

	userModel.update(user, function(status){


        if(status){
            console.log('user updated');
            res.redirect('/home/employerlist');
        }else{

        }

	});
	
	// res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{
	let id= req.params.id;

	userModel.getById(id, function(results){
		console.log(results[0].name);
		var empname = results[0].name;
		var empcompany = results[0].company;
		var empcontact = results[0].contact;

		res.render('admin/delete', {name: empname, company: empcompany, contact: empcontact});

		
	});


	
	
});

router.post('/delete/:id', (req, res)=>{

	let id= req.params.id;


    userModel.delete(id, function(status){
        
        res.redirect('/home/employerlist');
	});
	// res.redirect('/home/employerlist');
});

router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/employerlist', {users: results});
	});

})

module.exports = router;

