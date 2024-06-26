const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

// WebProtection
exports.webProtection = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jsonwebtoken.verify(token, process.env.SIGNING_KEY);
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


