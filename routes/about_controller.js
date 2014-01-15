function AboutController(db) {
	this.index = function(req, res) {
		res.render('about');
	}
}

module.exports = AboutController;