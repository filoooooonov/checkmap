"use server";

import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";

export async function getEventData(eventCode: string) {
  await connectMongoDB();

  const event = await Event.findOne({ eventCode })
    .populate("creatorId")
    .populate("checkpoints");

  if (!event) return null;
  else {
    // Convert the event to objects to avoid Next.js errors
    const eventObject = event.toObject();
    eventObject._id = eventObject._id.toString();

    return eventObject;
  }
}
