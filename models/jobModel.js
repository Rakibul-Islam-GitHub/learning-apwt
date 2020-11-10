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

	},
	getAll: function(callback){
		var sql = "select * from job";
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
	update:function(job, callback){
        let sql= 'update job set companyname= "'+job.comname+'", title= "'+job.title+'", location= "'+job.location+'", salary= "'+job.salary+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	delete: function(id, callback){

        let sql= 'delete from job where id= "'+id.id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}