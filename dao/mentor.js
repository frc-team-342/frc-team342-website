function MentorDAO(db) {
	if (!(this instanceof MentorDAO)) {
		console.log('Warning: MentorDAO constructor called without "new" operator.');
		return new MentorDAO(db);
	}

	var mentors = db.collection("mentors");

	this.findAll = function(callback) {
		mentors.find().toArray(function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, result);
			}
		})
	}

	this.findById = function(id, callback) {
		mentors.findOne({"_id": id}, function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, result);
			}
		});
	}

	this.findBySubteam = function(subteam, callback) {
		mentors.find().toArray(function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, result);
			}
		});
	}

	this.create = function(mentor, callback) {
		console.log("Insert: ");
		console.log(mentor);
		mentors.insert(mentor, function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				console.log(result);
				callback(err, result);
			}
		});
	}
}

module.exports.MentorDAO = MentorDAO;