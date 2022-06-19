import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import APIError from "./error";

export type AuthenticatedRequest = Request & {
  userId: string;
};

/**
 * Middleware function to verify JWT
 *
 * @param req Request
 * @param res Response
 * @param next Function to call after log
 * @returns authReq AuthenticatedRequest with userId
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  // Check token exists
  if (!token) {
    return new APIError(
      "UnauthorizedError",
      "Token doesn't exist"
    ).sendResponse(res);
  }

  // Verify JWT
  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, decoded: { id: string }) => {
      // Check JWT valid
      if (err || !decoded.id) {
        return new APIError("UnauthorizedError", err.message).sendResponse(res);
      }

      const authReq = req as AuthenticatedRequest;
      authReq.userId = decoded.id;
      next();
    }
  );
}
