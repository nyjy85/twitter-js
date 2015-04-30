var express = require('express');

// MOUNTS the routers so that app.js and routers are connceted
// you always do this when you have your apps and routes in a seperate modules
var router = express.Router(); // this is a sub Router
var parser = require('body-parser');
// could use one line instead: var router = require('express').Router();

// imports the tweetbank.js file so that this file can use its functions .add(), .find(), and . list()
var tweetBank = require('../tweetBank');


// export an entire function to be used in app.js
module.exports = function (io) {
	router.use(parser.urlencoded({ extended: false }))
	router.use(parser.json());

	router.get('/', function (req, res) {
	  var blahblah = tweetBank.list();
	  // no need to type in index.html because i already defined it in app.js
	  // the index is like a bus and the 2nd argument are the passengers.  the variable names need to match the var names
	  	// in the html file so each passenger finds their home
	  	console.log(blahblah);
	  res.render( 'index', { title: 'Twitter.js', list: blahblah, showForm: true } ); //(directory to pass data into, data to pass)
	});

	router.get('/users/:name', function(req, res){
		var name = req.params.name;
		var mmhmm = tweetBank.find({name: name});
		console.log(mmhmm);
		res.render('index', {title: 'Twitter.js - Posts by '+name, list: mmhmm, showForm: true, name:name })
	});

	router.get('/users/:name/tweets/:id', function(req, res){
		var name = req.params.name;
		var id = parseInt(req.params.id, 10);
		// var tweet = tweetBank.find({name: name});
		var tweetID = tweetBank.find({name: name, id: id});
		console.log(tweetID);
		// console.log(tweet);
		res.render('index', {title: 'Twitter.js - Posts by '+ name, list: tweetID })
	});

	// use the following code when none of the previous conditions are met
	// router.use(function(req, res){
	// 	res.send("ERRRRRRROOOOORRR BIATCH").end();
	// });

	router.post('/submit', function(req, res){
		// console.log(req.body);

		var name = req.body.name;
		var tweet = req.body.text;
		// adds the name and tweet to our tweet bank and set it equal to a variable.  Because the add() function is returning 
			// a value, it will not
		var theTweet = tweetBank.add(name, tweet);
		console.log(theTweet.text);

		// this is the emitter
		io.sockets.emit('new_tweet', theTweet);
		// redirects to root directory after tweet
		res.redirect('/');
	});

	return router;
}