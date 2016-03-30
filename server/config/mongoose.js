// MONGOOSE JS

// require mongoose
var mongoose = require('mongoose');


// require file-system (to load, read, require model file)
var fs = require('fs');

// connecting to database 
mongoose.connect('mongodb://localhost/Hashfighters');


// specify the path to all the models
var models_path = __dirname + '/../models'


// read all of the files in the models_path
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('js') > 0){
		require(models_path + '/' + file);
	}
})