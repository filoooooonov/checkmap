"use server";

import Checkpoint from "@/models/checkpoint";
import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";

export async function deleteCheckpoint(checkpointId: string) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Find the checkpoint to get the event reference
    const checkpoint = await Checkpoint.findById(checkpointId);
    if (!checkpoint) {
      throw new Error("Checkpoint not found");
    }

    // Remove the checkpoint reference from the event
    await Event.findOneAndUpdate(
      { eventCode: checkpoint.event },
      { $pull: { checkpoints: checkpointId } }
    );

    // Delete the checkpoint
    await Checkpoint.findByIdAndDelete(checkpointId);

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting checkpoint:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}