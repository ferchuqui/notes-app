const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
// aca hice cambios
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async(email, password, done)=>{
  const user = await User.findOne({email: email});
  if (!user){
    return done(null, false, {message: 'Not User Found'})
  } else {
    const match = await User.matchPassword(password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Password Incorrect'})
    }
  }
}))

passport.serializeUser((done, user) =>{
  done(null, user, id)
})

passport.deserializeUser((id, done) =>{
  user, findById( id, (err,user) =>{
    done(err,user)
  })
})