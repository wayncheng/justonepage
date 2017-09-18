'use strict';
(function(){
	const express = require("express");
	const router = express.Router();

	// Import the model (Page.js) to use its database functions.
	const Page = require("../models/Page.js");

	// Create all our routes and set up logic within those routes where required.
	router.get("/", function(req, res) {
		Page.all(function(data) {
			let hbsObject = {
				Pages: data
			};
			console.log(hbsObject);
			res.render("index", hbsObject);
		});
	});

	router.post("/", function(req, res) {
		Page.create([
			"name", "sleepy"
		], [
			req.body.name, req.body.sleepy
		], function() {
			res.redirect("/");
		});
	});

	router.put("/:id", function(req, res) {
		let condition = "id = " + req.params.id;

		console.log("condition", condition);

		Page.update({
			sleepy: req.body.sleepy
		}, condition, function() {
			res.redirect("/");
		});
	});

	// Export routes for server.js to use.
	module.exports = router;

	
})();