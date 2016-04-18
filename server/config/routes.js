// ROUTES JS

// require tweets controller
var tweets = require('./../controllers/tweets.js');



module.exports = function(app){

	// GETS ==================================
	app.get('/get_Tweets', function(req, res){
		tweets.getTweets(req, res);
	});

	app.get('/get_all_tweets', function(req, res){
		tweets.getAllTweets(req, res);
	})


	// POSTS =================================




}