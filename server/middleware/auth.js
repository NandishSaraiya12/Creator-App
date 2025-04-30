const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token provided, authorization denied' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ msg: 'Token has expired, please log in again' });
      }
      return res.status(403).json({ msg: 'Token is not valid' });
    }
    req.user = user;
    next();
  });
};
