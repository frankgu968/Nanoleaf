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

server.get('/', function(request,response){
	entry.find({ entryName : 'introString'}, function(err, docs){
		if(err){console.log("error!")};
		response.send(docs[0]['entryData']);
	});
});

server.listen(port,function(){
	console.log(port);
});