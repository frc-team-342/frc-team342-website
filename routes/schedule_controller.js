var ScheduleDAO = require('../dao/schedule').ScheduleDAO;

function ScheduleController(db) {

	var scheduleDao = new ScheduleDAO(db);

	this.index = function(req, res) {
		scheduleDao.findAll(function (err, schedules) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					html: function() {
						res.render('schedules/index', {'schedules': schedules});
					},

					json: function() {
						res.json(schedules);
					}
				});
			}
		});
	}

	this.show = function(req, res) {
		var subteam = req.params.subteam;
		scheduleDao.findBySubteam(subteam, function(err, schedules) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					html: function() {
						var data = {
							'subteam': subteam,
							'schedules': schedules
						}
						res.render('schedules/subteam-schedule', data);
					},

					json: function() {
						res.json(schedule);
					}
				});
			}
		});
	}
}

module.exports = ScheduleController;