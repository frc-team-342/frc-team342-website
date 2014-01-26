var express = require('express')
	, engine = require('ejs-locals')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, app = express()
	, acceptOverride = require('connect-acceptoverride')
	, MongoClient = require('mongodb').MongoClient
	, routes = require('./routes')
	, dateutils = require('date-utils')
	, capitalize = require('string-capitalize');

var connection_string = '127.0.0.1:27017/team342-site';

MongoClient.connect('mongodb://' + connection_string, function(err, db) {
	"use strict";
	if(err) throw err;

	app.engine('ejs', engine);

	var ip_addr   = '0.0.0.0';
	var port      = '3000';

	app.set('port', port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(express.methodOverride());
	app.use(acceptOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '/public')));
	app.use(express.static(path.join(__dirname, '/content')));

	app.locals.dateFormat = dateutils.format;
	app.locals.capitalize = capitalize;
	app.locals.shorten_post = function(text, maxLength) {
		var ret = text;
		if (ret.length > maxLength) {
			ret = ret.substr(0,maxLength-3) + "&hellip;";
		}
		return ret;
	};

	app.use(function(req, res, next){
		res.status(404);
		
		// respond with html page
		if (req.accepts('html')) {
			res.render('404', { url: req.url });
			return;
		}

		// respond with json
		if (req.accepts('json')) {
			res.send({ error: 'Not found' });
			return;
		}

		// default to plain-text. send()
		res.type('txt').send('Not found');
	});

	// Express middleware to populate 'req.cookies' so we can access cookies
	app.use(express.cookieParser());

	// Application routes
	routes(app, db);

	app.listen(port, ip_addr, function() {
				console.log('%s: Node server started on %s:%d ...',
				Date(Date.now()), ip_addr, port);
	});
});