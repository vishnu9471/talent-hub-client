import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing");
      return res.status(500).json({
        error: "Server configuration error: JWT_SECRET is missing.",
      });
    }

    const authHeader = req.headers.authorization;

    console.log(
      "🔐 Authorization header:",
      authHeader ? "Present" : "Missing"
    );

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Bearer token provided");

      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Access denied. Invalid token.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("✅ JWT verified for user:", decoded.id);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("❌ JWT verification error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired. Please log in again.",
      });
    }

    return res.status(401).json({
      error: "Invalid token.",
    });
  }
};