import jwt from "jsonwebtoken";

// admin authentication middleware

const authAdmmin = async (res, req, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (
      !token_decode !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log("authAdmin error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authAdmmin;
