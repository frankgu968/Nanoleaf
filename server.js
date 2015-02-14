var express = require('express');
var server = express();	//Use express framework

var port = process.env.PORT || 1337;
//Connects to the mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://Frank:frankgu968@ds060977.mongolab.com:60977/MongoLab-a');

var db = mongoose.connection;	//Get the connection object
var EntrySchema = new mongoose.Schema({
	entryName: String,
	entryData: String
});
var entry = mongoose.model('Entry', EntrySchema);

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function(callback){
	console.log('success');
});

server.set('view engine','jade');

server.get('/', function(request,response){
	entry.find({ entryName : 'introString'}, function(err, docs){
		if(err){console.log("error!")};
		response.render('template', {
			title: docs[0]['entryData']
		})
	});
});

server.get('/data', function(request, response) {
	entry.find({ entryName : 'interest'}, function(err, docs){
		if(err){console.log("error!")};
		response.json(docs);
	});
});

server.listen(port,function(){
	console.log(port);
});