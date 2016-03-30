// TWEETS MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TweetSchema
var TweetSchema = new mongoose.Schema({
	hashfight_id:String,
	tweeter:String,
	tweet:String,
	created_at:String,
	profile_image:String
}); // end of TweetSchema


mongoose.model('Tweet', TweetSchema);