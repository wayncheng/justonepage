"use strict";
(function() {
	// DEPENDENCIES ===================================
	const express = require("express");
	const bodyParser = require("body-parser");
	const logger = require("morgan");
	const exphbs = require("express-handlebars");
	const path = require("path");
	const methodOverride = require("method-override");
	require("dotenv").config();
	// var mongojs = require("mongojs");
	const moment = require("moment");

	// CONFIG =======================================
	const mongoose = require("mongoose");
	const Page = require("./models/Page.js");
	mongoose.Promise = Promise;

	const app = express();
	const port = process.env.PORT || 5000;

	app.disable("x-powered-by");

	// Set Static Directory
	app.use(express.static(path.join(__dirname, "public")));

	// Set Handlebars
	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	app.set("view engine", "handlebars");

	// Use morgan with app
	app.use(logger("dev"));

	// Set Body Parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	// Override with POST having ?_method=
	app.use(methodOverride("_method"));

	// logs each url that is requested, then passes it on.
	app.use(function(req, res, next) {
		console.log("url : " + req.url);
		next();
	});
	//=================================================
	mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/justonepage');
	var db = mongoose.connection;

	db.on("error", function(err) {
		console.log("Mongoose error:", err);
	});
	db.once("open", function() {
		console.log("Mongoose connected!");
	});

	var Schema = mongoose.Schema;

	//=================================================
	//   var entry = new Page({
	// 	  title: 'Pizza is delicious.',
	// 	  link: 'https://che.ng',
	// 	  author: 'Batman Batman',
	// 	  author_profile: 'https://instagram.com/wayncheng',
	// 	  date: 'Aug 24'
	//   });

	//   // Now, save that entry to the db
	//   entry.save(function(err, doc) {
	// 	if (err) { console.log(err); }
	// 	else {
	// 	  console.log(doc);
	// 	}
	//   });

	// Basic HTML gets
	var routes = require("./controllers/basic-controller.js");
	app.use("/", routes);

	// ERRORS =========================================
	app.use(function(req, res) {
		res.type("text/html");
		res.status(404);
		res.render("404");
	});

	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500);
		res.render("500");
	});

	// START SERVER ===================================
	app.listen(port, function() {
		console.log(`-------------------------------------------------------
                                          ready @ ${port}`);
	});
	//==================================================
})();

// var open = $('.kv__value .kv__primary')
// var price = $('.intraday__price .value').text();
// // var change = $('.intraday__change .change--point--q').text();
// // var percentchange = $('.intraday__change .change--percent--q').text();
// var change = $('.intraday__change .change--point--q bg-quote').text();
// var percentchange = $('.intraday__change .change--percent--q bg-quote').text();
// console.log('change',change);
// console.log('percentchange',percentchange);

// results.push({
// 	stock: stock,
// 	company: company,
// 	price: price,
// 	change: change,
// 	percentchange: percentchange
// })
