require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, Token Not Found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

exports.generateAccessToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(new Error("Error:" + err));
        }
        resolve(token);
      }
    );
  });
};
