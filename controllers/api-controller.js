"use strict";
(function() {
  var express = require("express");
  var bodyParser = require("body-parser");
  var router = express.Router();
  // var db = require("../models");
  var dbPage = require("../models/Page");
  var bcrypt = require("bcryptjs");
  var saltRounds = 10;


  /////////////////////////////////////////////////////
  // router.get("/api/all", function(req, res) {
  //   dbPage.findAll({}).then(function(data) {
  //     console.log("data", data);
  //     return res.json(data);
  //   });
	// });
	
	router.get('/:id', (req,res) => {
		const {id} = req.params;
		// console.log('req.params',req.params);
		console.log('api-controller id',id);
		// dbPage.one(id).then( data => {
		// 	console.log('data',data);
		// 	return res.json(data);
		// })
		dbPage.one(id, data => {
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
