// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Page schema
var PageSchema = new Schema({
	// title is a required string
	content: {
		type: String,
		required: true
	},
	date: {
		type: String
	},
});

// Create the Page model with the PageSchema
var Page = mongoose.model("Page", PageSchema);

// Export the model
module.exports = Page;
