const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token salah' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
};


module.exports = { authenticate };
