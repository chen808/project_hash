// VOTES MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// VoteSchema
var VoteSchema = new mongoose.Schema({
	battle_name:String,
	vote_count:Number,
}); // end of TweetSchema


mongoose.model('Vote', VoteSchema);