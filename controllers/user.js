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

	var user = {
		username: 'test',
		password: 'test',
		email: 'rakibul@gmail.com'
	};
	res.render('admin/edit', user);
});

router.post('/edit/:id', (req, res)=>{
	res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{
	var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};
	res.render('admin/delete', user);
});

router.post('/delete/:id', (req, res)=>{
	res.redirect('/home/userlist');
});

module.exports = router;

