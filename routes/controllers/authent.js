var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

passport.use(new LocalStrategy(function(username, password, done) {
	db.author.findOne({
		author : username
	}, function(err, user) {
		var pwmd5 = crypto.createHash('md5').update(password).digest("hex");
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message : 'Unknown user'
			});
		}
		if (user.password != pwmd5) {
			return done(null, false, {
				message : 'Invalid password'
			});
		}
		if (user.key) {
			return done(null, false, {
				message : 'Email not confirm'
			});
		}
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	db.author.findOne({
		_id : new db.ObjectID(id)
	}, function(err, user) {
		db.txt.lastForA(user.author, function(err, items) {
			if(items[0])
				user.lastT = items[0].p;
			else
				user.lastT = [0, 0];
			done(err, user);
		});
	});
});

