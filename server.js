var http = require('http');
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
	/*
	var message = new entry({
		entryName : 'introString',
		entryData : 'Hello world!'
	});

	var interest = new entry({
		entryName : 'interest',
		entryData : 'Learn cool new things!'
	});

	message.save(function(err, message){
		if(err) return console.error(err);
		console.log(message);
	});

	interest.save(function(err, interest){
		if(err) return console.error(err);
		console.log(interest);
	});
	*/
});
	
http.createServer(function(req, res) {
	entry.find({ entryName : 'introString'}, function(err, docs){
		if(err){console.log("error!")};
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(docs[0]['entryData']);
	});
}).listen(80,'127.0.0.1');