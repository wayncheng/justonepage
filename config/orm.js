'use strict';
(function(){
////////////////////////////////////////////////////
// Import MySQL connection.
const connection = require("../config/connection.js"); 

// Database / Table variables to use in ORM
const DB = process.env.JAWSDB_DB;
const PAGES_TABLE = DB+'.pages';
const USERS_TABLE = DB+'.users';

////////////////////////////////////////////////////
	const orm = {
		// one: function(id, cb) {
		// 	var queryString = `SELECT * FROM ${PAGES_TABLE} WHERE id = ${id}`;
		// 	console.log('queryString',queryString);

		// 	connection.query(queryString, function(err, result) {
		// 		if (err) { throw err }

		// 		let { id , text } = result[0];
		// 		console.log('id',id);
		// 		console.log('text',text);

		// 		cb(result[0]);
		// 	});
		// },
		////////////////////////////////////////////////////
		getUserData: function(username,cb){
			console.log('ORM >>> getUserData');
			let query = `
				SELECT ${PAGES_TABLE}.text
				FROM ${PAGES_TABLE}
				LEFT JOIN ${USERS_TABLE} 
				ON ${PAGES_TABLE}.uuid = ${USERS_TABLE}.id
				WHERE ${USERS_TABLE}.user = "${username}";
			`;
			
			connection.query(query, (err,result) => {
				if (err) throw err;
				let dbResponse = result[0];
				console.log('dbResponse',dbResponse);
				cb(dbResponse);
			});
		},
		////////////////////////////////////////////////////
		getById: function(id, cb) {
			var queryString = `SELECT * FROM ${PAGES_TABLE} WHERE id = ${id}`;
			console.log('queryString',queryString);

			connection.query(queryString, function(err, result) {
				if (err) { throw err }

				let { id , text } = result[0];
				console.log('id',id);
				console.log('text',text);

				cb(result[0]);
			});
		},
		////////////////////////////////////////////////////
		getByName: function(username, cb) {
			console.log('ORM -- getByName -->');
			let user = username.trim();

			const queryString = `SELECT * FROM ${USERS_TABLE} WHERE user = "${user}"`;

			connection.query(queryString, (err, result) => {
				if (err) { throw err }

				let userData = result[0];
				console.log('userData',userData);

				// Send back to API
				cb(userData);
			});
		},

		create: function(cols, vals, cb) {
			const colString = cols.toString();
			const questionMarks = printQuestionMarks(vals.length);
			const queryString = 
				`INSERT INTO ${PAGES_TABLE} (${colString}) 
				VALUES (${questionMarks})`;
			
			console.log(queryString);
			
			// var queryString = "INSERT INTO " + PAGES_TABLE;
			// queryString += " (";
			// queryString += cols.toString();
			// queryString += ") ";
			// queryString += "VALUES (";
			// queryString += printQuestionMarks(vals.length);
			// queryString += ") ";
		
			connection.query( queryString, vals, (err,result) => {
				if (err) throw err;
				cb(result);
			});
		},
		// An example of objColVals would be {name: panther, sleepy: true}
		update: function(id, text, cb) {
			
			// UPDATE `justonepage_db`.`pages` SET `text`='one' WHERE `id`='1';
			var queryString = `UPDATE ${PAGES_TABLE} SET text = "${text}" WHERE id = ${id}`;
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