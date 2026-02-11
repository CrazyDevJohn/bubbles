import { type Response, type Request, type NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next();
  }
};

export const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      res.status(401).json({ message: "UnAuthorized" });
    }

    let user = await User.findOne({ clerkId });

    if (!user && clerkId) {
      // get user ionput from clerk and save db
      const clerkUser = await clerkClient.users.getUser(clerkId);

      user = await User.create({
        clerkId,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] || "User",

        email: clerkUser.emailAddresses[0]?.emailAddress,
        avatar: clerkUser?.imageUrl || "",
      });
    }

    res.json(user);
  } catch (error) {
    console.log(`Error in authCallback: ${error}`);
    res.status(500);
    next();
  }
};
