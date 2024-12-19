import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "unaclavesecreta";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "unaclavesecreta2";
const JWT_ACCESS_EXPIRED = process.env.JWT_ACCESS_EXPIRED;
const JWT_REFRESH_EXPIRED = process.env.JWT_REFRESH_EXPIRED;

export const generateAccessToken = (payload) => {
  console.log("JWT_ACCESS_EXPIRED:", JWT_ACCESS_EXPIRED);
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRED || "12h",
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRED || "7d",
  });
};
