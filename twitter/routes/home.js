/**
 * http://usejsdoc.org/
 */
var ejs = require("ejs");
//var session = require('client-sessions');
var mysql = require('./mysql');
var encryption= require('./encryption');


exports.logout = function(req, res) {
	
	 console.log("reset not done");
	  req.session.destroy();
	  console.log("reset done");
	  ejs.renderFile('./views/index.ejs',function(err, result) {
		   // render on success
		   if (!err) {
		            res.end(result);
		   }
		   // render or error
		   else {
		            res.end('An error occurred');
		            console.log(err);
		   }
	   });
	}

exports.signin= function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}
exports.signup= function signup(req,res) {

	ejs.renderFile('./views/tsignup.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}
exports.afterSignIn= function afterSignIn(req,res){
	// check user already exists
	console.log(req.param);
	var ep= req.param("password");
	console.log("aj"+ep);
	var ep_pro= encryption.encrypt(ep);
	console.log(ep_pro);
	var getUser="select * from USER_DETAILS where USER_NAME='"+req.param("username")+"' and USER_PASSWORD='" + ep_pro +"'";
	console.log("Query is:"+getUser);
	var flag=0;
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				req.session.username=results[0]["USER_NAME"];
     			req.session.password=results[0]["USER_PASSWORD"];
     			req.session.userid=results[0]['USER_ID'];
     			req.session.name=results[0]["FIRST_NAME"]+results[0]["LAST_NAME"];
     			console.log(req.session.username);
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			 flag=1;
			}
		}  
	},getUser);	
	
};
exports.afterSignUp= function afterSignUp(req,res){
	var ep= req.param("password");
	console.log(ep);
	var ep_pro= encryption.encrypt(ep);
	console.log(ep_pro);
	var query= "INSERT INTO `twitter_new`.`USER_DETAILS` (`USER_NAME`, `USER_PASSWORD`, `FIRST_NAME`, `LAST_NAME`, `DOB`, `HANDLE`, `CONTACT_INFO`, `LOCATION`)  VALUES " +
	"('"+req.param("username")+"', '"+ep_pro+"', '"+req.param("fname")+"', '"+req.param("lname")+"', '"+req.param("dob")+"', '"+req.param("handle")+"', '"+req.param("phoneNumber")+"', '"+req.param("location")+"')";
	console.log(query);
    mysql.insertData(function(err,result){
    	var results = []
    	results.push({"username": req.param("username")});
    	results.push({"password": req.param("password")});
    	
    	results.push({"Name": req.param("fname")});
    	if(err)
    	{
    		throw err;
    	}
    	else
    		{
    		res.send("Inserted");
    				}
    },query);	
};

exports.editProfile= function editProfile(req,res){
	var ep= req.param("password");
	console.log(ep);
	var ep_pro= encryption.encrypt(ep);
	console.log(ep_pro);
	var query= "INSERT INTO `twitter_new`.`USER_DETAILS` (`USER_NAME`, `USER_PASSWORD`, `name`) VALUES ('"+req.param("username")+"', '"+ep_pro+"', '"+req.param("fname")+"')";
    console.log(query);
    mysql.insertData(function(err,result){
    	var results = []
    	results.push({"username": req.param("username")});
    	results.push({"password": req.param("password")});
    	
    	results.push({"Name": req.param("fname")});
    	if(err)
    	{
    		throw err;
    	}
    	else
    		{
    		res.send("Inserted");
    				}
    },query);	
};

exports.sucesslogin=function signin(req,res) {
	var results=[];
	console.log(req.session.username);
	results[0]={"username":req.session.username};
	results[0].password=req.session.password;
	console.log(results);
	ejs.renderFile('./views/successLogin.ejs',{data:results},function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
};

exports.fetchOldName= function fetchOldName(req,res){
	// check user already exists
	
	var getUserName="select * from USER_DETAILS where USER_ID="+req.session.userid;
	console.log("Query is:"+getUserName);
	var flag=0;
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			 flag=1;
			}
		}  
	},getUserName);	
	
};
	
exports.editProfile= function editProfile(req,res){
	var name=req.param("newname");
	var lname=req.param("lname");
	var location=req.param("location");
	var handle=req.param("handle");
	var dob=req.param("dob");
	var query= "UPDATE `twitter_new`.`USER_DETAILS` set FIRST_NAME='"+name+"', " +
			"LAST_NAME='"+lname+"'," +
			"LOCATION='"+location+"',  " +
			"HANDLE='"+handle+"', " +
			"DOB='"+dob+"' " +
			"where USER_ID="+req.session.userid;
    console.log(query);
    mysql.updateData(function(err,result){    	
    	var results = [];
    	results.push({"Name": req.param("name")});
    	if(err)
    	{
    		throw err;
    	}
    	else
    		{
    		res.send("Updated");
    				}
    },query);	
};