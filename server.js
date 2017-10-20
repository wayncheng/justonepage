"use strict";
(function() {
	// DEPENDENCIES ===================================
	// const exphbs = require("express-handlebars");
	// const methodOverride = require("method-override");
	const express = require("express");
	const bodyParser = require("body-parser");
	const path = require("path");
	require("dotenv").config();
	const moment = require("moment");
	const session = require("express-session");
	const cookieParser = require("cookie-parser");

	// CONFIG =======================================
	const app = express();
	const PORT = process.env.PORT || 5000;
	app.disable("x-powered-by");
	// app.use((req, res, next) => {
	// 	res.header('Access-Control-Allow-Origin', '*')
	// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	// 	next();
	// });

	// Set Handlebars
	// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	// app.set("view engine", "handlebars");

	// Set Body Parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	// Cookie Parsing
	app.use(cookieParser());
	app.use(session({
		secret: "shhsecret",
		resave: true,
		saveUninitialized: false,
		cookie: {
			httpOnly: false
		}
	}));

	// Sets access control headers
	// logs each url that is requested, then passes it on.
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*')
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
		console.log("url : " + req.url);
		next();
	});

	// Route to serve gzipped bundle.js file.
	// IMPORTANT: This NEEDS to be higher-priority than the static route
	if (process.env.NODE_ENV === 'production') {
		app.get("*/bundle.js", function(req, res, next) {
			req.url = req.url + ".gz";
			res.set("Content-Encoding", "gzip");
			res.set("Content-Type", "text/javascript");
			next();
		});
	}

	// Set Static Directory
	app.use(express.static(path.join(__dirname, "public")));
	

	// Default React route
	app.get("*", (req, res, next) => {
		res.sendFile(path.join(__dirname, "./public/index.html"));
	});

	// Basic HTML gets
	// const routes = require("./controllers/basic-controller.js");
	// app.use("/", routes);

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
	app.listen(PORT, function() {
		console.log(`-------------------------------------------------------
                                          ready @ ${PORT}`);
	});
	//==================================================
})();
