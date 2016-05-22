var ejs = require("ejs");
//var session = require('client-sessions');
var mysql = require('./mysql');

exports.loaduserfollowing=function loaduserfollowing(req,res){
	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var getuserdet="select count(*) as count from followers where USER_ID_CHILD="+id+"";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.send(results);
		}
	},getuserdet);
	
};

exports.loaduserfollowers=function loaduserfollowers(req,res){
	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var getuserdet="select count(*)as count from followers where USER_ID_PARENT="+id+"";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.send(results);
		}
	},getuserdet);
};

exports.loadusertweetcount=function loadftweetcount(req,res){
	var id=req.session.userid;
	var getuserdet="select count(*) as count from tweet where USER_ID="+id+"";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.send(results);
		}
	},getuserdet);
};

exports.loadutweets=function loadutweets(req,res)
{
	var id=req.session.userid;
	var i=0;
	var tweets=[];
	
		var tweetq="select * from tweet join user_details where tweet.user_id=user_details.user_id AND tweet.USER_ID="+id+"";
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log(results);
				res.send(results);
			}
		},tweetq);
		
	console.log("tweets"+tweets);
}
