const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
//const mysql = require('mysql');
const router 		= express.Router();


// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'node1'
// });



router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	// connection.connect((err) => {
	// 	if(err) throw err;
	// 	console.log('Connected to MySQL Server!');
	// });

	var user = {
		username: req.body.username,
		password: req.body.password
	};
// let sql= "select * from user";
// 	connection.query(sql, function(err, result){
// 		   console.log(result[0].name);
// 		   if(result[0].username==username){
// 			res.redirect('/home');
// 		   }else{
// 				res.redirect('/login');
// 				}
// 		   connection.end();


// 	});

	userModel.validate(user, function(status){
		if(status){
			res.cookie('uname', req.body.username);
			res.redirect('/home');
		}else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;