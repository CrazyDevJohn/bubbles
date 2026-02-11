import { type Response, type Request, type NextFunction } from "express";
import { User } from "../models/User";
import type { AuthRequest } from "../middleware/auth";

export async function getUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    const users = await User.find({
      _id: { $ne: userId },
    })
      .select("nmae email avatar")
      .limit(50);

    res.json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
}
