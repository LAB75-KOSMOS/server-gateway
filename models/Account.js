
var mongoose        = require('mongoose');
var passport_plugin = require('passport-local-mongoose');


var Account = new mongoose.Schema({
	username: String,
	passwort: String
});

Account.plugin(passport_plugin);

module.exports = mongoose.model('Account', Account);

