const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
  try {
    // Check if authorization header is provided
    if (!req.headers.authorization) {
      return res.status(400).json({ msg: "Authorization header not provided" });
    }

    // Extract token from header
    const token = req.headers.authorization.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(400).json({ msg: "Token not found" });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({ msg: "Invalid or expired token" });
      }

      
      req.userId = decoded.userId;
      next()
    });
  } catch (error) {
    
    return res.status(500).json({ msg: "Error in authentication", error });
  }
};

module.exports = Auth;
