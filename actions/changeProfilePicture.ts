"use server";

import User from "@/models/user";
import { connectMongoDB } from "@/utils/mongo";

export async function changeProfilePicture(base64Image: string, userId: string) {
  await connectMongoDB();
  try {
    if (!base64Image) {
      throw new Error("No picture uploaded");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: base64Image },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return { success: true, message: "Profile picture updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
