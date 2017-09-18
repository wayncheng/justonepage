"use strict";
(function() {
	// DEPENDENCIES ===================================
	const express = require("express");
	const bodyParser = require("body-parser");
	const exphbs = require("express-handlebars");
	const path = require("path");
	const methodOverride = require("method-override");
	require("dotenv").config();
	const moment = require("moment");

	// CONFIG =======================================
	const app = express();
	const port = process.env.PORT || 5000;

	app.disable("x-powered-by");

	// Set Static Directory
	app.use(express.static(path.join(__dirname, "public")));

	// Set Handlebars
	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	app.set("view engine", "handlebars");

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

	// Basic HTML gets
	const routes = require("./controllers/basic-controller.js");
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
