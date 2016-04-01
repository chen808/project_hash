// TWEETS CONTROLLER

var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');

// import the twit package
var Twit = require('twit');

// import the twitter keys and token from twit_config.js
var config = require('../../twit_config');

// making a new twitter object with config (containing the keys)
var T = new Twit(config);


module.exports = (function(){

	return {

		getTweets: function(req, res){

			T.get('search/tweets', { q: '%23dojobatman OR %23dojotrump', count: 1 }, function(err, data, response) {
				var tweets = data.statuses;
				// res.json(tweets);

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
					// Tweet.find({hashfight_id:hashfight_id, tweeter:tweeter, tweet:text, created_at:date, profile_image:profile_image}, function(err, results){
					// 	if(err){
					// 		console.log('Already exists');
					// 	}
					// 	else{
					// 		if(results == ''){
					// 			// create the new tweet if it doesn't exist
					// 			Tweet.create({hashfight_id:hashfight_id, tweeter:tweeter, tweet:text, created_at:date, profile_image:profile_image});
								
					// 			Tweet.find({}, function(err, results){
					// 				if(err){
					// 					console.log('Error getting data');
					// 				}
					// 				else{
					// 					res.json(results);
					// 					console.log("printing from backend controller" + results);
					// 				}
					// 			});
					// 		}
					// 		else{
					// 			console.log('alreay exist');
					// 		}
					// 	}
					// })



					//adding tweets to database
					var results = Tweet.create({hashfight_id:hashfight_id, tweeter:tweeter, tweet:text, created_at:date, profile_image:profile_image});


					// finds all
					Tweet.find({}, function(err, results){
						if(err){
							console.log('Error getting data');
						}
						else{
							res.json(results);
						}
					});
				}
			}); // end of T.get

		},

	} // end return

})(); // end module.exports



