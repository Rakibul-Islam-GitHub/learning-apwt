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
  let user={
	  name: "employer"
  };
	
	res.render('employer/edit', user);
});

router.post('/edit/:id', (req, res)=>{
	let user={
		name : req.body.name,
		company : req.body.company,
		contact : req.body.contact,
		username: req.body.username,
		password: req.body.password
		

	};

	userModel.update(user, function(status){

        if(status){
            console.log('user updated');
            res.redirect('/home/employerlist');
        }else{

        }

	});
	
	res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{

	userModel.getAll(function(results){
		let user={
			name : results.name

		};
	});


	
	res.render('employer/delete', user);
});

router.post('/delete/:id', (req, res)=>{

	let id={
        id : req.params.id

    };

    userModel.delete(function(id){
        
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

