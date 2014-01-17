function PostDAO(db) {
	if (!(this instanceof PostDAO)) {
		console.log('Warning: PostDAO constructor called without "new" operator.');
		return new PostDAO(db);
	}

	var posts = db.collection('posts');

	this.findAll = function(callback) {
		posts.find().sort({'date': 1}).toArray(function(err, result) {
			if (err) {
				callback(err, null);
			} else { 
				callback(err, result);
			}
		});
	}

	this.find = function(query, fields, options, callback) {
		posts.find(query, fields, options).toArray(function(err, posts) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, posts);
			}
		});
	}

	this.findByTag = function(tag, callback) {
		posts.find({'tag': tag}, function(err, posts) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, posts);
			}
		});
	}

	this.findByPermalink = function(permalink, callback) {
		posts.findOne({'permalink': permalink}, function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, result);
			}
		});
	}

	this.count = function(query, callback) {
		posts.count(query, function(err, count) {
			if (err) {
				callback(err, null);
			} else {
				callback(err, count);
			}
		});
	}
}

module.exports.PostDAO = PostDAO;