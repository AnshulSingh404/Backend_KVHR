module.exports = {
    port: 3000,
    otpExpirationTime: 5 * 60 * 1000,
    dbConnectionString: 'mongodb://localhost:27017/Registration',
    // google: {
    //   clientID: 'YOUR_GOOGLE_CLIENT_ID',
    //   clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    //   callbackURL: 'http://localhost:3000/auth/google/callback',
    // },
    jwtSecret: 'YOUR_JWT_SECRET',
  };
  