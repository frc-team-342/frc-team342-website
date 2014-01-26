function SubteamDAO(db) {

	if (!(this instanceof SubteamDAO)) {
		console.log('Warning: SubteamDAO constructor called without "new" operator.');
		return new SubteamDAO(db);
	}

	var subteams = db.collection("subteams");

	this.findByName = function(name, callback) {
		var query = {'name': name};

		subteams.findOne(query, function(err, result) {
			if (err) {
				console.log(err);
				callback(err, null);
			} else {
				callback(err, result);
			}
		});
	}
}

module.exports.SubteamDAO = SubteamDAO;