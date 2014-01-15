function ScheduleDAO(db) {
	if (!(this instanceof ScheduleDAO)) {
		console.log('Warning: ScheduleDAO constructor called without "new" operator.');
		return new ScheduleDAO(db);
	}

	var schedules = db.collection("schedules");

	this.findAll = function(callback) {
		schedules.find().toArray(function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, result);
			}
		});
	}

	this.findBySubteam = function(subteam, callback) {
		schedules.find({"subteam": subteam}).sort({'week': 1}).toArray(function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, result);
			}
		});
	}
}

module.exports.ScheduleDAO = ScheduleDAO;