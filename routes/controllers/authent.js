var passport = require('passport'), PersonaStrategy = require('passport-persona').Strategy;
;

passport.serializeUser(function(user, done) {
	done(null, user.email);
});

passport.deserializeUser(function(email, done) {
	db.author.findOne({
		email : email
	}, function(err, user) {
		db.txt.lastForA(user.author, function(err, items) {
			if (items[0])
				user.lastT = items[0].p;
			else
				user.lastT = [0, 0];
			done(null, user);
		});
	});
});

passport.use(new PersonaStrategy({
	audience : 'http://127.0.0.1:5020'
}, function(email, done) {
	db.author.findOne({
		email : email
	}, function(err, user) {
		return done(err, user);
	});
}));

