var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var EntrySchema = new Schema({
	entryName: String,
	entryData: String
});