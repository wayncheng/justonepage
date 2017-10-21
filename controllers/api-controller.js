'use strict';
(function(){
	const express = require("express");
	const router = express.Router();
	const orm = require('../config/orm');

	// Import the model (Page.js) to use its database functions.
	// const Page = require("../models/Page.js");

	router.get('/ping', (req,res) => res.send('wassup fam') )
	
	router.get('/:id', (req,res) => {
		// console.log('---- controller GET --->');
		orm.one( req.params.id , (results) => {
			console.log('results',results);
			res.send(results)
		})
	})
	// router.post("/", function(req, res) {
	// 	Page.create([
	// 		"name", "sleepy"
	// 	], [
	// 		req.body.name, req.body.sleepy
	// 	], function() {
	// 		res.redirect("/");
	// 	});
	// });

	router.post("/:id", function(req, res) {
		console.log('---- controller UPDATE --->');
		let {id} = req.params;
		let {text} = req.body;
		console.log('id',id);
		console.log('text',text);
		// res.send('controller update res.send')
		orm.update( id, text, results => {
			console.log('results',results);
		})

	});

	// Export routes for server.js to use.
	module.exports = router;

	
})();