"use server";

import Event from "@/models/event";
import Checkpoint from "@/models/checkpoint"; // Import Checkpoint model
import { connectMongoDB } from "@/utils/mongo";
import User from "@/models/user";

export async function getUserData(userId: string) {
  await connectMongoDB();

  const user = await User.findById( userId );

  if (!user) return null;

  const userObject = user.toObject();

  return JSON.parse(JSON.stringify(userObject));
}
