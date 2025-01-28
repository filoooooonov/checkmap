"use server";

import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";
import User from "@/models/user";
export async function addEvent(eventData: {
  name: string;
  description?: string;
  eventCode: string;
  creatorId: string;
  checkpoints?: string[];
  startDate: string;
}) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Create a new event
    const newEvent = await Event.create({
      ...eventData,
      startDate: new Date(eventData.startDate),
    });

    if (!newEvent) {
      throw new Error("Failed to create the event");
    }
    const userUpdateResult = await User.findByIdAndUpdate(
      eventData.creatorId, // The ID of the user to update
      { $push: { events: newEvent._id } }, // Add the event ID to the `events` array
      { new: true } // Return the updated user document
    );

    if (!userUpdateResult) {
      throw new Error("Failed to associate the event with the user");
    }
    // Convert the event to a plain object and serialize `_id`
    const serializedEvent = JSON.parse(
      JSON.stringify({
        ...newEvent.toObject(),
        _id: newEvent._id.toString(),
      })
    );

    return serializedEvent;
  } catch (error: any) {
    console.error("Error adding event:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}
