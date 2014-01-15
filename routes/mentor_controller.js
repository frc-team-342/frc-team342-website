var MentorDAO = require('../dao/mentor').MentorDAO;

function MentorController(db) {
	"use strict";

	var mentorsDao = new MentorDAO(db);

	// GET /mentors
	// GET /mentors.json
	this.index = function(req, res) {
		mentorsDao.findAll(function(err, mentors) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					html: function() {
						res.render('mentors/index', {'mentors': mentors});
					},

					json: function() {
						res.json(mentors);
					}
				});
			}
		});
	}

	// GET /mentors/:id
	// GET /mentors/:id.json
	this.show = function(req, res) {
		var id = req.params.id;

		mentorsDao.findById(id, function(err, mentor) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					html: function() {
						res.send("MentorController#show()");
					},

					json: function() {
						res.json({controller: "MentorController", method: "show"});
					}
				});
			}
		});
	}

	// GET /mentors/new
	this.new = function(req, res) {
		var mentor = {};

		res.format({
			html: function() {
				res.render('mentors/new', {'mentor': mentor});
			}
		});
	}

	// GET /mentors/:id/edit
	this.edit = function(req, res) {
		var id = req.params.id;

		mentorsDao.findById(id, function(err, mentor) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					html: function() {
						res.render('mentors/edit', {'mentor': mentor});
					}
				});
			}
		});
	}

	// POST /mentors
	this.create = function(req, res) {
		var mentor = req.body;
		mentorsDao.create(mentor, function(err, mentor) {
			if (err) {
				console.log(err);
			} else {
				res.render('mentors/edit', {'mentor': mentor});
			}
		});
	}

	// PUT /mentors/:id
	this.update = function(req, res) {

	}

	// DELETE /mentors/:id
	this.destroy = function(req, res) {

	}
}

module.exports = MentorController;