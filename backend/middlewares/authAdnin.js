import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    next();
  } catch (error) {
    console.error("authAdmin error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authAdmin;
