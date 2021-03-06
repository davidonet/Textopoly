var passport = require('passport'), PersonaStrategy = require('passport-persona').Strategy;
;

passport.serializeUser(function(user, done) {
	done(null, user.email);
});

passport.deserializeUser(function(email, done) {
	db.author.findOne({
		email : email
	}, function(err, user) {
		if (user)
			db.txt.lastForA(user.author, function(err, items) {
				if (items[0])
					user.lastT = items[0].p;
				else
					user.lastT = [0, 0];
				done(null, user);
			});
		else {
			done(null, {
				email : email
			});
		}
	});
});

passport.use(new PersonaStrategy({
	audience : 'http://textopoly.org'
}, function(email, done) {
	db.author.findOne({
		email : email
	}, function(err, user) {
		if (user == null)
			user = {
				email : email
			};
		return done(err, user);
	});
}));

