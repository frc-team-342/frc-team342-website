var async = require('async');
var MentorDAO = require('../dao/mentor').MentorDAO;
var StudentDAO = require('../dao/student-dao').StudentDAO;
var SubteamDAO = require('../dao/subteam-dao').SubteamDAO;

function SubteamController(db) {

	var mentorDao = new MentorDAO(db);
	var studentDao = new StudentDAO(db);
	var subteamDao = new SubteamDAO(db);

	this.index = function(req, res) {
		res.format({
			html: function() {
				res.render('subteams/index');
			}
		});
	};

	this.show = function(req, res) {
		var subteam = req.params.subteam;

		async.parallel({
			subteam: function(callback) {
				subteamDao.findByName(subteam, function(err, subteam) {
					if (err) {
						callback(err, null);
					} else {
						callback(err, subteam);
					}
				});
			},
			mentors: function(callback) {
				var options = {fields: {'subteam': 0}};
				mentorDao.findBySubteam(subteam, options, function(err, mentors){
					if (err) {
						callback(err, null);
					} else {
						callback(err, mentors);
					}
				});
			},
			students: function(callback) {
				var options = {sort: { 'grade': -1 }, fields: {'subteam': 0}};

				studentDao.findBySubteam(subteam, options, function(err, students) {
					if (err) {
						callback(err, null);
					} else {
						callback(err, students);
					}
				});
			}
		}, function(err, subteam) {
			res.format({
				html: function() {
					res.render('subteams/show', subteam);
				},
				json: function() {
					res.json(subteam);
				}
			})
		});
	}
}

module.exports = SubteamController;