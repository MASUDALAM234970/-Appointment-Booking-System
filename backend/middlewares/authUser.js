import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const { token } = req.headers; // Extract token from headers

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", token_decode);

    // ✅ Use `id` instead of `_id` (Fix)
    req.userId = token_decode.id;

    next(); // Proceed to next middleware/controller
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
