import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "unaclavesecreta";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "unaclavesecreta2";
const JWT_ACCESS_EXPIRED = process.env.JWT_ACCESS_EXPIRED;
const JWT_REFRESH_EXPIRED = process.env.JWT_REFRESH_EXPIRED;

export const generateAccessToken = (payload) => {
  const expiresIn = process.env.JWT_ACCESS_EXPIRED || "30d"; // 15 minutos
  console.log(expiresIn);
  const token = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
  return token;
};

export const generateRefreshToken = (payload) => {
  const expiresIn = process.env.JWT_REFRESH_EXPIRED || "30d"; // 30 días
  console.log(expiresIn);
  const token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
  return token;
};
