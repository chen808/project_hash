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

	app.get('/getAllPoll', function(req, res){
		tweets.get_all_poll(req, res);
	})


	// POSTS =================================
	app.post('/update_fight_count/:id', function(req, res){
		tweets.updateFightCount(req, res, req.params.id);
	})

}