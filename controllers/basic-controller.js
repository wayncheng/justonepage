// blah1 is the column name/ name attr in html
"use strict";
(function() {

  var express = require("express");
	var router = express.Router();
	

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
