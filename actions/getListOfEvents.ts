"use server";

import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";
import Checkpoint from "@/models/checkpoint";
import User from "@/models/user";
export async function getListOfEvents(userId: string) {
  await connectMongoDB();

  const events = await Event.find({ creatorId: userId })
  if (!events || events.length === 0) return [];
  else {
    // Convert the event to objects to avoid Next.js errors
    const serializedEvents = events.map((event) => ({
        ...event.toObject(),
        _id: event._id.toString(),
      }));
    return serializedEvents;
  }
}