const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    req.user = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Error during JWT verification:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
