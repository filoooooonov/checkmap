"use server";

import Event from "@/models/event";
import Checkpoint from "@/models/checkpoint"; // Import Checkpoint model
import { connectMongoDB } from "@/utils/mongo";
import User from "@/models/user";

export async function removeEvent(eventId: string) {
  await connectMongoDB();

  try {
    const event = await Event.findOne({ _id: eventId });
    if (event) {
      await Checkpoint.deleteMany({ eventId: eventId });
      const userUpdateResult = await User.findByIdAndUpdate(
        event.creatorId, // The ID of the user to update
        { $pull: { events: event._id } }, // Remove the event ID from the `events` array
        { new: true } // Return the updated user document
      );
    
      if (!userUpdateResult) {
        throw new Error("Failed to dissociate the event from the user");
      }
      await Event.findOneAndDelete({ _id: eventId });
    } else {
      throw new Error("Event not found");
    }
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
}
