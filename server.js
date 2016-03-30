// SERVER JS

// require express
var express = require('express');

// require path
var path = require('path');

// instantiate the express app
var app = express();

// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());




// allow index.html to use any additional static files it needs
app.use(express.static(path.join(__dirname, './client')));

require('./server/config/mongoose.js');

var route_setter = require('./server/config/routes.js');
route_setter(app);





// set up static file server
app.use(express.static(path.join(__dirname,'./client')));
app.listen(8000, function(){
	console.log('Batman is listening on port 8000');
});