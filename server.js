var http = require('http')
var port = process.env.PORT || 1337;
//Connects to the mongodb database
var mongoose = require('mongoose');
mongoose.connect('mongodb://Frank:frankgu968@ds060977.mongolab.com:60977/MongoLab-a');

var db = mongoose.connection;	//Get the connection object


http.createServer(function(req, res) {
	db.on('error', console.error.bind(console, 'Connection Error'));
	db.once('open', function(callback){
			var EntrySchema = new Schema({
			entryName: String,
			entryData: String
		});

		var entry = mongoose.model('Entry', EntrySchema);

		var message = new entry({
			entryName : 'introString',
			entryData : 'Hello world!'
		});

		var interest = new entry({
			entryName : 'interest',
			entryName : 'Learn cool new things!'
		});

		message.save(function(err, message){
			if(err) return console.error(err);
			console.log(message);
		});

		interest.save(function(err, interest){
			if(err) return console.error(err);
			console.log(interest);
		});
	});

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);