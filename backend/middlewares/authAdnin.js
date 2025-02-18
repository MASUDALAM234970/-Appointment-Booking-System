import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    // console.log(atoken);
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    console.log(token_decode);

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again?",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authAdmin;
