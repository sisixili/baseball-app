// Runs before req to verify user is logged in

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) return res.json({ error: "Login first!" });

  try {
    const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); 
    if (validToken) {
      req.userId = validToken.userId;
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
