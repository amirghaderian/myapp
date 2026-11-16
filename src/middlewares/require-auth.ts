import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;
  const userId = typeof token === "string" ? verifyToken(token) : null;

  if (userId === null) {
    res.status(401).json({ message: "Please log in first" });
    return;
  }

  req.userId = userId;
  next();
};
