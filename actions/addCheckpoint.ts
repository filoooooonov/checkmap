"use server";

import Checkpoint from "@/models/checkpoint";
import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";

export async function addCheckpoint(checkpointData: {
  name: string;
  description?: string;
  location: { type: string; coordinates: [number, number] };
  event: string;
  images?: string[];
  isInside: boolean;
}) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Create a new checkpoint
    const newCheckpoint = await Checkpoint.create(checkpointData);

    if (!newCheckpoint) {
      throw new Error("Failed to create the checkpoint");
    }
    
    // Add the checkpoint to the event
    await Event.findOneAndUpdate({eventCode: checkpointData.event}, {
      $push: { checkpoints: newCheckpoint._id },
    });

    // Convert the checkpoint to a plain object and serialize `_id`
    const serializedCheckpoint = JSON.parse(
      JSON.stringify({
        ...newCheckpoint.toObject(),
        _id: newCheckpoint._id.toString(),
      })
    );

    return serializedCheckpoint;
  } catch (error: any) {
    console.error("Error adding checkpoint:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}