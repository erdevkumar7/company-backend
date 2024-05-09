const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

// WebProtection
exports.webProtection = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jsonwebtoken.verify(token, process.env.SIGNING_KEY);
      req.user_role = decoded.user_role;
      next();
    } else {
      res.status(400).send({
        message: "please provide auth token",
      });
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// Check if the user has the required role
exports.checkUserRole = (req, res, next) => {
  try {
    if (req.user_role !== "admin") {
      res
        .status(403)
        .json({ message: "Forbidden: User does not have permission" });
    }
    next();
  } catch (e) {
    res.status(400).json(e.message);
  }
};
