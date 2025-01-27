"use server";

import Event from "@/models/event";
import Checkpoint from "@/models/checkpoint"; // Import Checkpoint model
import { connectMongoDB } from "@/utils/mongo";
import User from "@/models/user";

export async function getEventData(eventCode: string) {
  await connectMongoDB();

  const event = await Event.findOne({ eventCode });

  if (!event) return null;

  const eventObject = event.toObject();

  return JSON.parse(JSON.stringify(eventObject));
}
