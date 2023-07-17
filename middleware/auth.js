const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");

const authMiddleWare = async (req, res, next) => {
  //   console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //check if auth headers present
    //check if its valid format
    //return 401 for invalid credentials otherwise
    throw new UnAuthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //decoded has id,username,issued at,expiry date
    const { id, username } = decoded;
    //pull out id and username and stick it to req object
    //to be used in next middleware
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Not Authorized to access this route");
  }
};

module.exports = authMiddleWare;
