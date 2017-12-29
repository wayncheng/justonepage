"use strict";
(function() {
  const express = require("express");
  const bodyParser = require("body-parser");
	const router = express.Router();
  const dbPage = require("../models/Page");
  const ORM = require("../config/orm");
  const bcrypt = require("bcryptjs");
  const saltRounds = 10;


  /////////////////////////////////////////////////////
  // router.get("/api/all", function(req, res) {
  //   dbPage.findAll({}).then(function(data) {
  //     console.log("data", data);
  //     return res.json(data);
  //   });
	// });
	// GET User Data ///////////////////////////////////////////////////
	router.get('/data/:username', (req,res) => {
		console.log('controller / data / username');
		ORM.getUserData( req.params.username, data => {
			console.log('data',data);
			return res.json(data);
		})
	})
	// GET User ///////////////////////////////////////////////////
	router.get('/user/:username', (req,res) => {
		ORM.getByName( req.params.username, data => {
			console.log('data',data);
			return res.json(data);
		})
	})
	/////////////////////////////////////////////////////
	router.get('/id/:id', (req,res) => {
		const {id} = req.params;
		// console.log('req.params',req.params);
		console.log('api-controller id',id);
		// dbPage.one(id).then( data => {
		// 	console.log('data',data);
		// 	return res.json(data);
		// })
		dbPage.getById(id, data => {
			console.log('data',data);
			return res.json(data);
		})
	})
		
	

// SIGNUP ==================================================
  router.post("/signup", function(req, res) {
		console.log('---- SIGNUP --->');
    var rb = req.body;
		bcrypt.hash(req.body.pw, saltRounds, function(err, hash) {
			console.log("hash", hash);

			dbPage.create({ user: rb.username, pw: hash, }).then( data => {
				console.log('data',data);
					res.redirect('/');
				});
		});
    // }
  });

// LOGIN ==================================================
  router.post("/login", function(req, res) {
		console.log('---- LOGIN --->');
    // db.User
    //   .findOne({
    //     where: {
    //       username: req.body.uid
    //     }
    //   })
    //   .then(function(data) {
    //     if (data) {
    //       console.log("access granted?", data.pw);

    //       bcrypt.compare(req.body.pw, data.pw, function(err, response) {
    //         if (response === true) {
    //           res.redirect("/loginSuccess/" + req.body.uid);
    //         } else {
    //           res.redirect("/login/text");
    //         }
    //       });
    //     } else {
    //       console.log("Authentication Failed. Username is wrong.");
    //       const url = require("url");
    //       res.redirect(
    //         url.format({
    //           pathname: "/login/text/" + req.body.uid,
    //           query: {
    //             error: "Authentication Failed. Username is wrong"
    //           }
    //         })
    //       );
    //     }
    //   });

    // });
  });
  /////////////////////////////////////////////////////
  //  Add New User
  //   router.post("/", function(req, res) {
  //     console.log("req.body", req.body);

  //     api.insert(
  //       ["username", "text_password"],
  //       [req.body.username, text_password],
  //       function() {
  //         res.redirect("/");
  //       }
  // 	);

  //   });

  /////////////////////////////////////////////////////
  //   Update Existing User
  //   router.put("/:id", function(req, res) {
  //     var condition = "id = " + req.params.id;
  //     var devoured = req.body.devoured;
  //     var bool = false;
  //     if (devoured === "on") { bool = true; }

  //     api.update({ devoured: bool }, condition, function() {
  //       res.redirect("/");
  //     });
  //   });



  module.exports = router;
})();
