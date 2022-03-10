const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

const user_model = require("../../../../models/User");
const sequelize = require("../../../../configs/db.config");

const User = user_model(sequelize, DataTypes);

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userName",
        passwordField: "passWord",
        passReqToCallback: true,
        session: false,
      },
      function (req, userName, passWord, done) {
        // request object is now first argument
        // ...
      }
    )
  );
  // passport.use(
  //   new localStrategy({usernameField: "userName", passwordField: "passWord"},{
  //     User.findOne({ where: { userName: userName } });
  //     // , (err, user) => {
  //     //   if (err) throw err;
  //     //   if (!user) return done(null, false);
  //     //   bcrypt.compare(password, user.password, (err, result) => {
  //     //     if (err) throw err;
  //     //     if (result === true) {
  //     //       return done(null, user);
  //     //     } else {
  //     //       return done(null, false);
  //     //     }
  //     //   });
  //     // });
  //   }
  // );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
