"use server";

import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";
import Checkpoint from "@/models/checkpoint";
import User from "@/models/user";
export async function getListOfEvents(userId: string) {
  await connectMongoDB();
  if(userId === "")return //TODO: FIX
  const user = await User.findById(userId).populate("events");
  if (!user || user.events.length === 0) return [];
  else {
    const serializedEvents = user.events.map((event: any) =>
      JSON.parse(
        JSON.stringify({
          ...event.toObject(),
          _id: event._id.toString(),
        })
      )
    );
    return serializedEvents;
  }
}
