
(function(global) {

	var express  = require('express');
	var path     = require('path');
	var passport = require('passport');



	/*
	 * EXPRESS APP
	 */

	var app = express();

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(require('body-parser')());
	app.use(require('cookie-parser')('My totally secret secret'));
	app.use(require('express-session')({ secret: 'My totally secret secret' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(path.resolve(__dirname, './public')));


	var env = process.env.NODE_ENV || 'development';
	if (env === 'development') {
		app.use(require('express-error-handler')({ dumpExceptions: true, showStack: true }));
	} else {
		app.use(require('express-error-handler')());
	}



	/*
	 * PASSPORT CONFIG
	 */

	var Account          = require('./models/Account');
	var mongoose         = require('mongoose');
	var PassportStrategy = require('passport-local').Strategy;


	passport.use(new PassportStrategy(Account.authenticate()));
	passport.serializeUser(Account.serializeUser());
	passport.deserializeUser(Account.deserializeUser());

	mongoose.connect('mongodb://localhost/passport_user');



	/*
	 * ROUTES CONFIG
	 */


	require('./routes/passport')(app);



	app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});

})(this);

