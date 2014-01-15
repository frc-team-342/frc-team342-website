function HomeController(db) {
	"use strict";

	this.index = function(req, res) {
		res.render('index');
	}
}

module.exports = HomeController;