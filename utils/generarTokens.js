import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "unaclavesecreta";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "unaclavesecreta";
const JWT_ACCESS_EXPIRED = process.env.JWT_ACCESS_EXPIRED;
const JWT_REFRESH_EXPIRED = process.env.JWT_REFRESH_EXPIRED;

export const generateAccessToken = async (payload) => {
  const expiresIn = process.env.JWT_ACCESS_EXPIRED || 60 * 15;
  const token = await jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
  return token;
};

export const generateRefreshToken = async (payload) => {
  const expiresIn = process.env.JWT_REFRESH_EXPIRED || 60 * 60 * 24 * 30;
  const token = await jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
  return token;
};
