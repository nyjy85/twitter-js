// REQUIRE ALL NECESSARY FILES
// =================================
// express uses the http module to create a server
var express = require( 'express' );
// think of app as a pipeline for your requests
var app = express();
var morgan = require('morgan');
var tweet = require('./tweetBank');
var swig = require('swig');
var routes = require('./routes/');
var socketio = require('socket.io');

swig.setDefaults({cache : false});

// RUN ALL ENGINES
// =================================
// allows us to use the res.render function 
// it's telling express I want swig to interpret html files for me
// engine is a compiler that runs and interprets swig code in index.html!!!!!
// need to create and set a new engine for res.render() to work/exist
// .engine() creates the engine
// try this to test out
	// app.engine('html', function(){console.log(arguments)})
app.engine('html', swig.renderFile);//.renderFile() is a swig method that takes a file path and data and finds the template in the file path and data and smooshes it together
// looks for the html extension in my directory
// I have an engine I created, called `html` and make that the view engine
// this will allow res.redner() to work

app.set('view engine', 'html');

// the path to the folder where we assign our templates
// not necessary with the new version of express
app.set('views', __dirname + '/views');


// RUN SERVER
// ======================================

var server = app.listen(1337);// .listen() starts our server
var io = socketio.listen(server);

// MIDDLEWARE
// =====================================
	// this is where you want to tell your app the use the middleware and where

// app.use('/', routes); - you use app.use() to set up middleware
// you add this code to apply middleware(2nd arg) to the declared file path (first argument)
// regardless of method and URL it will use that function passed into `.use()`
// If you wanted to use middleware for only GET requests, you'd have to pass it into the `.get()` method
// whenever a request comes in, it looks at the public directory to check if that file exists
// your public directory holds all your front end shit
app.use(express.static(__dirname + '/public')); // express.static is another type of Middleware

// you use app.USE() whenver you need to use MIDDLEWARE for your APP
// use the logger when the server starts running
app.use(morgan( 'dev' ));

// use the routes I set up in index.js
app.use('/', routes(io));




// LITERALLY WHAT A SERVER SHOULD DO 
// 1. require all necessary modules
// 2. set up server
// 3. set up rendering
// 4. set up access to public folders


// app.get() vs app.use()
// ============================
// app,get(function(req, res, next){}) - calls the function only if it there was a GET requests
// app.use(function(req, res, next){}) any method will call the function




