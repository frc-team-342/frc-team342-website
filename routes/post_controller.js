var PostDAO = require('../dao/post').PostDAO;
var async = require('async');

var DEFAULT_PAGE = 1;
var DEFAULT_PER_PAGE = 10;

function PostController(db) {

	var postDao = new PostDAO(db);

	this.index = function(req, res) {
		var page = parseInt(req.param('page')) || DEFAULT_PAGE;
		var per_page = parseInt(req.param('per_page')) || DEFAULT_PER_PAGE;
		var offset = (page - 1) * per_page;

		var query = {$query: {}, $orderby: { date: -1 }};
		var fields = {};
		var options = {'skip': offset, 'limit': per_page};

		async.parallel({
			page_count: function(callback) {
				postDao.count(query, function(err, count) {
					if (err) {
						console.log(err);
						callback(err, null);
					} else {
						var page_count = (count / per_page);
						callback(err, page_count);
					}
				});
			},
			posts: function(callback) {
				postDao.find(query, fields, options, function(err, posts) {
					if (err) {
						console.log(err);
						callback(err, null);
					} else {
						callback(err, posts);
					}
				});
			}
		}, function(err, data) {
			res.format({
				html: function() {
					data.page = page;
					res.render('blog/index', data);
				},
				json: function() {
					res.json(data);
				}
			});
		});
	}

	this.show = function(req, res) {
		var permalink = req.params.permalink;

		postDao.findByPermalink(permalink, function(err, post) {
			res.format({
				html: function() {
					res.render('blog/show', {'post': post});
				},
				json: function() {
					res.json(post);
				}
			});
		})
	}
}

module.exports = PostController;