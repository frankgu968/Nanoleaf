/*
	Filename: server.js
	Version: 1.0
	Author: Frank Gu
	Description:
	Simple NodeJS based server that handles bidirectional database operations on MongoDB
	
	This code is under the provision of The MIT License
	Copyright (c) 2015 Frank Gu

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
 */

var express = require('express');
var bodyParser = require('body-parser');
var server = express();	//Use express framework
var port = process.env.PORT || 1337;
//Connects to the mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://Frank:frankgu968@ds060977.mongolab.com:60977/MongoLab-a');

var db = mongoose.connection;	//Get the connection object
//Define database schemas
var EntrySchema = new mongoose.Schema({
	entryName: String,
	entryData: String
});
var entry = mongoose.model('Entry', EntrySchema);

//Database connection 
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function(callback){
	console.log('success');
});

//Use the body-parser to parser the incoming POST data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended : true
}));

//Use the jade templating engine
server.set('view engine','jade');

//Routing information
//Primary route
server.get('/', function(request,response){
	entry.find({ entryName : 'introString'}, function(err, docs){
		if(err){console.log("error!")};
		response.render('template', {
			title: docs[0]['entryData']
		});
	});
});

//Response when website AngularJS asks for 'objectives'
server.get('/data', function(request, response) {
	entry.find({ entryName : 'interest'}, function(err, docs){
		if(err){console.log("error!")};
		response.json(docs);
	});
	
});

//Response when website AngularJS asks for 'expectation'
server.get('/dataE',function(request,response){
	entry.find({entryName : 'expectation'},function(err,docs){
		if(err){console.log('DataE route error!')};
		response.json(docs);
	});
});

//Server response to the AngularJS POST request
server.post('/rcv',function(request,response){
	var data = request.body.message;
	
	var expectation = new entry({
		entryName : 'expectation',
		entryData : data
	});
	
	expectation.save(function(err, expectation){
		if(err) return console.error(err);
		console.log(expectation);
	});
});

//Listen on the system's environment port
server.listen(port,function(){
	console.log(port);
});