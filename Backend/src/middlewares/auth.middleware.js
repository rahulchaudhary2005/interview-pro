import jwt from "jsonwebtoken";

import tokenBlacklistModel from "../models/blacklist.model.js";



async function authUser(
  req,
  res,
  next
) {

  try {

    /* =========================================
       GET TOKEN
    ========================================= */

    const token =
      req.cookies?.token ||

      req.headers.authorization?.replace(
        /^Bearer\s+/i,
        ""
      );



    /* =========================================
       DEBUGGING
    ========================================= */

    console.log(
      "Incoming Auth Header:",
      req.headers.authorization
    );

    console.log(
      "Extracted Token:",
      token
    );



    /* =========================================
       TOKEN CHECK
    ========================================= */

    if (!token) {

      return res.status(401).json({
        success: false,

        message:
          "Token not provided.",
      });
    }



    /* =========================================
       BLACKLIST CHECK
    ========================================= */

    const isTokenBlacklisted =
      await tokenBlacklistModel.findOne({
        token,
      });

    if (isTokenBlacklisted) {

      return res.status(401).json({
        success: false,

        message:
          "Token is blacklisted.",
      });
    }



    /* =========================================
       VERIFY TOKEN
    ========================================= */

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );



    /* =========================================
       SAVE USER
    ========================================= */

    req.user = decoded;



    /* =========================================
       NEXT
    ========================================= */

    next();

  } catch (err) {

    console.log(
      "AUTH MIDDLEWARE ERROR:",
      err
    );

    return res.status(401).json({
      success: false,

      message:
        "Invalid or expired token.",

      error: err.message,
    });
  }
}



const protect = authUser;

export {
  authUser,
  protect,
};