import jwt from "jsonwebtoken";

export const verifyToken = async (req, resp, next) => {
  try {
    // from the frontend we are acquring the token
    let token = req.header("Authorization");
    if (!token) {
      resp.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // CHECKING THE JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
};
