const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
// const sendOtp = require('../services/smsGateway'); // Third-party SMS gateway service

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    // const { name, email, password, mobileNumber } = req.body;
    const { name, email, password} = req.body;
    // Check if user already exists
    // const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });
    const existingUser = await User.findOne({ $or: [{ email }] });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP and its expiration time to the user document
    // const otpExpiration = new Date(Date.now() + config.otpExpirationTime); // Add OTP expiration time (e.g., 5 minutes)
    const newUser = new User({
      name,
      email,
      password,
      // mobileNumber,
      // otp,
      // otpExpiresAt: otpExpiration,
    });
    await newUser.save();

    // Send OTP via SMS
    // sendOtp(mobileNumber, otp); // Replace with the actual method to send OTP via SMS

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    // const { email, password, mobileNumber, otp } = req.body;
    const { email, password} = req.body;
    let user;

    // Check if login is through email/password or mobile number/OTP
    if (email && password) {
      // Find the user by email
      user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } 
    // else if (mobileNumber && otp) {
    //   // Find the user by mobile number and OTP
    //   user = await User.findOne({ mobileNumber, otp, otpExpiresAt: { $gt: Date.now() } });
    //   if (!user) {
    //     return res.status(401).json({ message: 'Invalid mobile number or OTP' });
    //   }
    // } 
    else {
      return res.status(400).json({ message: 'Invalid request' });
    }

    // Clear OTP and OTP expiration time from the user document
    // user.otp = undefined;
    // user.otpExpiresAt = undefined;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;