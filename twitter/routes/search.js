var ejs = require("ejs");
//var session = require('client-sessions');
var mysql = require('./mysql');

exports.search=function search(req,res)
{
var sq=req.param("sq");
var query="SELECT * FROM tweet JOIN user_details where tweet.user_id=user_details.user_id AND tweet_message LIKE '%"+sq+"%'";
mysql.fetchData(function(err,results){
	if(err){
		throw err;
	}
	else 
	{
		console.log(results);
		res.send(results);
	}
	},query);

	//console.log("tweets"+results);
}