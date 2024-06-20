// Runs before req to verify user is logged in

import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "Login first!" });

  try {
    const validToken = verify(accessToken, "8waH28nEHUwE"); 
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
