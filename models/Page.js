// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var Page = {
  one: function(id,cb) {
		console.log('dbPage id', id);
    orm.one(id, function(res) {
      cb(res);
    });
  },
  all: function(cb) {
    orm.all("Pages", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("Pages", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("Pages", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

module.exports = Page;
