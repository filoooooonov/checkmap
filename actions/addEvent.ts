"use server";

import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";

export async function addEvent(eventData: {
  name: string;
  description?: string;
  eventCode: string;
  creatorId: string;
  checkpoints?: string[];
}) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Create a new event
    const newEvent = await Event.create(eventData);

    if (!newEvent) {
      throw new Error("Failed to create the event");
    }

    // Convert the event to a plain object and serialize `_id`
    const serializedEvent = {
      ...newEvent.toObject(),
      _id: newEvent._id.toString(),
    };

    return serializedEvent;
  } catch (error: any) {
    console.error("Error adding event:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}
