var async = require('async');
var MentorDAO = require('../dao/mentor').MentorDAO;
// var StudentDAO = require('../dao/student');

function SubteamController(db) {

	var mentorDao = new MentorDAO(db);

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
			mentors: function(callback) {
				mentorDao.findBySubteam(subteam, function(err, mentors){
					if (err) {
						callback(err, null);
					} else {
						callback(err, mentors);
					}
				});
			},
			students: function(callback) {
				callback(null, {});
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