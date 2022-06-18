import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type AuthenticatedRequest = Request & {
  userId: string;
};

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  // Check token exists
  if (!token) {
    return res.status(401).json({ token: "invalid" });
  }

  // Verify JWT
  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, decoded: { id: string }) => {
      // Check JWT valid
      if (err || !decoded.id) {
        return res.status(401).json({ token: "invalid" });
      }

      const authReq = req as AuthenticatedRequest;
      authReq.userId = decoded.id;
      next();
    }
  );
}
