import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // 1. Extract token from cookie or Authorization header
  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace(/^Bearer\s*/i, "");

  if (!token) {
    console.warn("❌ No token provided in cookies or Authorization header");
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    // 2. Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken?._id) {
      console.warn("❌ Token decoded but no user ID found:", decodedToken);
      throw new ApiError(401, "Unauthorized: Invalid token payload");
    }

    // 3. Fetch user from DB
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!user) {
      console.warn("❌ Token valid but user not found in DB");
      throw new ApiError(401, "Unauthorized: User not found");
    }

    // 4. Attach user to request object for downstream routes
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    throw new ApiError(401, "Unauthorized: Invalid or expired token");
  }
});
