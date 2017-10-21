'use strict';
(function(){
////////////////////////////////////////////////////
	// Import MySQL connection.
	var connection = require("../config/connection.js");
	const table = 'justonepage_db.pages'
	
	// Object for all our SQL statement functions.
	var orm = {
		one: function(id, cb) {
			var queryString = `SELECT * FROM ${table} WHERE id = ${id}`;
			console.log('queryString',queryString);

			connection.query(queryString, function(err, result) {
				if (err) { throw err }

				let { id , text } = result[0];
				console.log('id',id);
				console.log('text',text);

				cb(result[0]);
			});
		},
		create: function(table, cols, vals, cb) {
			var queryString = "INSERT INTO " + table;
			
			queryString += " (";
			queryString += cols.toString();
			queryString += ") ";
			queryString += "VALUES (";
			queryString += printQuestionMarks(vals.length);
			queryString += ") ";
			
			console.log(queryString);
			
			connection.query(queryString, vals, function(err, result) {
				if (err) {
					throw err;
				}
				
				cb(result);
			});
		},
		// An example of objColVals would be {name: panther, sleepy: true}
		update: function(id, text, cb) {
			
			// UPDATE `justonepage_db`.`pages` SET `text`='one' WHERE `id`='1';
			var queryString = `UPDATE ${table} SET text = "${text}" WHERE id = ${id}`;
			console.log(queryString);
			
			connection.query(queryString, function(err, result) {
				if (err) { throw err; }
				cb(result);
			});
		}
	};
	
	// Export the orm object for the model (cat.js).
	module.exports = orm;
	
	// Helper function for SQL syntax.
	function printQuestionMarks(num) {
		var arr = [];
		
		for (var i = 0; i < num; i++) {
			arr.push("?");
		}
		
		return arr.toString();
	}
	
	// Helper function to convert object key/value pairs to SQL syntax
	function objToSql(ob) {
		var arr = [];
		
		// loop through the keys and push the key/value as a string int arr
		for (var key in ob) {
			var value = ob[key];
			// check to skip hidden properties
			if (Object.hasOwnProperty.call(ob, key)) {
				// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
				if (typeof value === "string" && value.indexOf(" ") >= 0) {
					value = "'" + value + "'";
				}
				// e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
				// e.g. {sleepy: true} => ["sleepy=true"]
				arr.push(key + "=" + value);
			}
		}
		
		// translate array of strings to a single comma-separated string
		return arr.toString();
	}

////////////////////////////////////////////////////
})();