const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

const auth = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //Verify token

  try {
    const decode = jwt.verify(token, jwtSecret);

    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
