var AwardDAO = require('../dao/award-dao').AwardDAO;

function AboutController(db) {

	var awardDao = new AwardDAO(db);

	this.index = function(req, res) {
		var options = {sort: { 'year': -1 }};
		awardDao.findAll(options, function(err, result) {
			res.format({
				html: function() {
					res.render('about', {'awards': result});
				}
			});
		});
	}
}

module.exports = AboutController;