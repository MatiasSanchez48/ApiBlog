import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "no autorizado", data: {} });
    }

    tokenData = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || "unaclavesecreta"
    );

    if (!tokenData) {
      return res
        .status(401)
        .json({ status: "error", message: "no autorizado", data: {} });
    }

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: "error", message: "no autorizado", data: {} });
  }
};
