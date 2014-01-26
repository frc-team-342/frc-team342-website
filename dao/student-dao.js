function StudentDAO(db) {
	if (!(this instanceof StudentDAO)) {
		console.log('Warning: StudentDAO constructor called without "new" operator.');
		return new StudentDAO(db);
	}

	var students = db.collection('students');

	this.findBySubteam = function(subteam, options, callback) {
		var options = options || {};

		students.find({'subteam': subteam}, options).toArray(function(err, students) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, students);
			}
		});
	}
}

module.exports.StudentDAO = StudentDAO;