function AwardDAO(db) {

	if (!(this instanceof AwardDAO)) {
		console.log('Warning: AwardDAO constructor called without "new" operator.');
		return new AwardDAO(db);
	}

	var awards = db.collection("awards");

	this.findAll = function(options, callback) {
		var query = {};
		var options = options || {};

		awards.find(query, options).toArray(function(err, result) {
			if (err) {
				console.log(err);
				callback(err, null);
			} else {
				callback(err, result);
			}
		});
	}
}

module.exports.AwardDAO = AwardDAO;