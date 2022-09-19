const jwt = require("jsonwebtoken");
const AuthSchema = require("../model/user");
const JWT_SECRET  = process.env.JWT_SECRET;

exports.Protected = async (req, res, next) => {
  let TOKEN;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    TOKEN = req.headers.authorization.split(" ")[1];
  }
  if (!TOKEN) {
    return next(
      res
        .status(401)
        .json({ message: "invalid token or you are not authorized user" })
    );
  }
  try {
    let decoded = jwt.verify(TOKEN, JWT_SECRET);
    req.user = await AuthSchema.findById(decoded.id);
    next();
  } catch (error) {
    return next(
      res
        .status(401)
        .json({ message: error.message })
    );
  }
};