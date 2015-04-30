var _ = require('underscore');

var data = [];
var id = 0;


// adds new tweets and names to data
var add = function(name, text){//, cb) {
	data.push({name: name, text: text, id: id++});
	return data[data.length-1]
	// return cb(false, data[data.length - 1]);
};

// lists out all the names and tweets from data
var list = function() {
	return _.clone(data);
};

// finds the tweet of the property being passed in
var find = function(properties) {
	return _.where(data, properties); 
};

// exports all these functions in object form so that index.js can use it
module.exports = { add: add, list: list, find: find};


var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

// console.log(data);
// console.log(module.exports.find({name:'Dave Stacky'}));