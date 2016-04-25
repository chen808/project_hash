// TWEETS CONTROLLER

var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');
var Vote = mongoose.model('Vote');

// import the twit package
var Twit = require('twit');

// import the twitter keys and token from twit_config.js
var config = require('../../twit_config');

// making a new twitter object with config (containing the keys)
var T = new Twit(config);


module.exports = (function(){

	return {

		getTweets: function(req, res){
			// %23 -> #
			// this will search for 1 tweet at a time
			T.get('search/tweets', { q: '%23dojobatman OR %23dojotrump', count: 1 }, function(err, data, response) {

				// pulling the tweets from data
				var tweets = data.statuses;
			
				// create hash fight id
				var hashfight_id = "bat_v_trump"

				// get tweet and created at
				for(var i=0; i<tweets.length; i++){
					// parse the neccesary infomation from json data
					var text = tweets[i].text;
					var date = tweets[i].created_at;
					var tweeter = tweets[i].user.name;
					var profile_image = tweets[i].user.profile_image_url;


					// check if newly aquired tweet is in database
					// ===================================================
					Tweet.find({hashfight_id:hashfight_id, tweeter:tweeter, tweet:text, created_at:date, profile_image:profile_image}, function(err, results){
						console.log('OMG printing results before processing')
						console.log(results);

						// if result is empty, create the tweet content
						if(results == ''){
							// create the new tweet if it doesn't exist
							Tweet.create({hashfight_id:hashfight_id, tweeter:tweeter, tweet:text, created_at:date, profile_image:profile_image});
							console.log('Successfully created tweet content!');
							// return the new tweet back to front end
							Tweet.findOne({tweeter:tweeter, created_at:date}, function(err, results){
								if(err){
									console.log('error getting data');
								}
								else{
									res.json(results);
								}
							})
						}
						// if result is NOT empty, do NOT create!
						else{
							console.log('This tweet is already in database');
						}
						


					})


				}
			}); // end of T.get

		},


		getAllTweets: function(req, res){
			Tweet.find({}, function(err, results){
				if(err){
					console.log('error getting all tweets')
				}
				else{
					res.json(results);
				}
			})
		},



		update_fight_one: function(){

			Vote.findOneAndUpdate({_id:"571da70df8e5f0d515996eda"}, {$inc:{bats_v_supes: 1}}, function(err, Vote){
				if(err){
					console.log('Error updated fight one');
				}
				else{
					console.log('Successfully updated fight one');
				}
			})
		},

		get_all_poll: function(req, res){
			Vote.find({}, function(err, results){
				if(err){
					console.log('Error getting polls');
				}
				else{
					console.log(results);
					res.json(results);
				}
			})
		},

		updateFightCount: function(req, res){
			Vote.findOneAndUpdate( {_id:req.params.id}, {$inc:{vote_count: 1}}, function(err, Vote){
				if(err){
					console.log('error adding update count');
				}
				else{
					console.log('Successfully updated count');
				}
			})
		},









	} // end return

})(); // end module.exports



