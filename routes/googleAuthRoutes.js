// const express = require('express');
// const passport = require('passport');
// const passportGoogle = require('passport-google-oauth20');
// const config = require('../config');
// const User = require('../models/User');

// const router = express.Router();

// // Configure Passport.js Google Strategy
// passport.use(
//   new passportGoogle.Strategy(
//     {
//       clientID: config.google.clientID,
//       clientSecret: config.google.clientSecret,
//       callbackURL: config.google.callbackURL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if the user already exists
//         let user = await User.findOne({ email: profile._json.email });

//         if (!user) {
//           // Create a new user if not found
//           user = new User({
//             name: profile._json.name,
//             email: profile._json.email,
//             password: '', // No password for Google sign-up
//           });
//           await user.save();
//         }

//         done(null, user);
//       } catch (error) {
//         console.error('Error during Google authentication:', error);
//         done(error);
//       }
//     }
//   )
// );

// router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
//   // Generate JWT token
//   const token = jwt.sign({ userId: req.user._id }, config.jwtSecret, { expiresIn: '1h' });

//   // Redirect or send token to client
//   res.json({ token });
// });

// module.exports = router;
