
var passport = require('passport');
var Account  = require('./models/Account');


module.exports = function(app) {

	app.get('/', function(request, response) {
		response.render('index', { user: request.user });
	});

	app.get('/register', function(request, response) {

		response.render('register', {
			email:    '',
			username: '',
			password: ''
		});

	});

	app.post('/register', function(request, response) {

		Account.register(new Account({
			username: request.body.username,
			email:    request.body.email
		}), request.body.password, function(err, account) {

			if (err) {

				return response.render('register', {
					message: err.message,
					email:    request.body.email    || '',
					username: request.body.username || '',
					password: request.body.password || ''
				});

			}


			// Login directly after Registration
			passport.authenticate('local')(request, response, function() {
				response.redirect('/');
			});

		});

	});

	app.get('/login', function(request, response) {
		response.render('login', { user: request.user });
	});

	app.post('/login', passport.authenticate('local'), function(request, response) {
		response.redirect('/');
	});

	app.get('/logout', function(request, response) {
		request.logout();
		response.redirect('/');
	});

};

