var ejs = require("ejs");
//var session = require('client-sessions');
var mysql = require('./mysql');

exports.loadFollowing= function loadfollowing(req,res) {

	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var getuserdet="select count(*)as count from followers where USER_ID_CHILD="+id+"";
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

exports.loadfTweets=function loadfTweets(req,res)
{
	
	var result;
	var id=req.session.userid;
	var getuserdet="select USER_ID_PARENT from followers where USER_ID_CHILD="+id+"";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			tweets(results,req,res);
		}
	},getuserdet);
};

tweets=function(results,req,res){
	var i=0;
	var tweets=[];
	var ins;
	var cnt=1;
	var id=req.session.userid;
	if(results.length==1)
		{
	for(i=0;i<results.length;i++)
		{
		var tweetq="select * from tweet join user_details where tweet.user_id=user_details.user_id AND tweet.USER_ID in("+results[i]["USER_ID_PARENT"]+","+id+")";
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
		}
		}
	else if(results.length>1)
		{
		var inq;
		inq=id;
		var tweetq="select * from tweet join user_details where tweet.user_id=user_details.user_id AND tweet.USER_ID IN ";
		for(i=0;i<results.length;i++)
			{
			
				
				
					inq=inq+","+results[i]["USER_ID_PARENT"];
					
		}
		ins="("+inq+")";
		tweetq=tweetq+ins;
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
		}
	console.log("tweets"+tweets);
};

exports.loadFollowers= function loadfollowers(req,res) {

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

exports.loadftweetcount=function loadftweetcount(req,res){
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

exports.newtweet=function newtweet(req,res){
	var id=req.session.userid;
	var newtweet=req.param("newtweet");
	var query= "INSERT INTO `twitter_new`.`TWEET` (`TWEET_MESSAGE`, `USER_ID`) VALUES ('"+newtweet+"', " +id+")";
    console.log(query);
    mysql.insertData(function(err,result){    	
    	var results = [];
    	results.push({"Name": req.param("name")});
    	if(err)
    	{
    		throw err;
    	}
    	else
    		{
    		res.send("New Tweet Inserted");
    				}
    },query);	
};

exports.loadfollowerscontent= function loadfollowerscontent(req,res) {

	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var getuserdet="select FIRST_NAME,LAST_NAME,HANDLE from twitter_new.USER_DETAILS where USER_ID in(SELECT USER_ID_CHILD FROM twitter_new.FOLLOWERS where USER_ID_PARENT="+id+")";
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
exports.loadfollowingcontent= function loadfollowingcontent(req,res) {

	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var getuserdet="select FIRST_NAME,LAST_NAME,HANDLE from twitter_new.USER_DETAILS where USER_ID in(SELECT USER_ID_PARENT FROM twitter_new.FOLLOWERS where USER_ID_CHILD="+id+")";
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
