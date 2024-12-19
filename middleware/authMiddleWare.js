import jwt from "jsonwebtoken";

export const authMiddleWare = (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || "unaclavesecreta"
    );
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ status: 401, message: "Token expired", data: { error: err } });
    }
    return res.status(403).json({
      status: 403,
      message: "Invalid token",
      data: { error: err },
    });
  }
};
