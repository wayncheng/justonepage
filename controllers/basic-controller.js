// blah1 is the column name/ name attr in html
"use strict";
(function() {

  const express = require("express");
	const router = express.Router();
	

//================================================== 
router.get("/:username?", function(req, res) {
	// const {username} = req.params;

	res.json({
		status: '200',
		user: req.params.username,
	})
});
//================================================== 
router.get("/", function(req, res) {
    res.render("index", {
		title: 'JustOnePage'
	});	
});


//==================================================
module.exports = router; // Export routes for server.js to use.
////////////////////////////////////////////////////
})();
