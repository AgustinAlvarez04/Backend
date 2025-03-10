import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

export const extractTokenFromHeaders = (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) return res.status(401).json({ message: "Token not provided" });
    const tokenClear = token.slipt(" ")[1];
    const decodeToken = jwt.verify(tokenClear, SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (error) {
    throw error;
  }
};

export const extractTokenFromCookies = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodeToken = jwt.verify(token, SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (error) {
    throw error;
  }
};
