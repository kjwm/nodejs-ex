exports.getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
};

exports.getAuthUser = function() {
    var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    var passport = require('passport');
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return err;// done(err, false);
            }
            if (user) {
                return user;//done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};