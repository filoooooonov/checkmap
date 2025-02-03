"use server";

import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";

export async function changeEventName(newName: string, eventCode: string) {
  try {
    if (!newName || typeof newName !== "string") {
      throw new Error("Invalid event name");
    }
    await connectMongoDB();

    const event = await Event.findOneAndUpdate(
      { eventCode: eventCode },
      { name: newName },
      { new: true }
    );
    if (!event) {
      throw new Error("Event not found");
    }

    return { success: true, message: "Event name updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
