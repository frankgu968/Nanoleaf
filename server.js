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