"use server";

import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";
import User from "@/models/user";

export async function getEventData(eventCode: string) {
  await connectMongoDB();

  const event = await Event.findOne({ eventCode })
    .populate("creatorId")
    .populate("checkpoints");

  if (!event) return null;

  const eventObject = event.toObject();
  eventObject._id = eventObject._id.toString();
  eventObject.creatorId._id = eventObject.creatorId._id.toString();

  if (Array.isArray(eventObject.checkpoints)) {
    eventObject.checkpoints = eventObject.checkpoints.map((checkpoint: any) => {
      checkpoint._id = checkpoint._id.toString();
      return checkpoint;
    });
  } else {
    eventObject.checkpoints = [];
  }
  return eventObject;
}
