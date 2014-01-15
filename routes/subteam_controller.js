function SubteamController(db) {

	this.index = function(req, res) {
		res.format({
			html: function() {
				res.render('subteams/index');
			}
		});
	};
}

module.exports = SubteamController;