const db = require('./db');

module.exports= {
	validate: function(user, callback){
		//var sql = `select * from user where username="${user.username}" and password="${user.password}"`;
		let sql= 'select * from user where username="'+user.username+'" and password="'+user.password+'" ';
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = 'select * from user where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from user where id != 1";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		let sql= 'insert into user (name, company,contact, username, password) values ("'+user.name+'","'+user.company+'","'+user.contact+'","'+user.username+'","'+user.password+'") ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	update:function(user, callback){

		let sql= 'update user set name= "'+user.name+'", company= "'+user.company+'", contact= "'+user.contact+'", username= "'+user.username+'", password= "'+user.password+'" where id= "'+user.id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},

	search: function(content, callback){
		var sql = 'SELECT name from user where name like "%'+content+'%"';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	delete: function(id, callback){
		let sql= 'delete from user where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}