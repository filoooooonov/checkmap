import mongoose, { models, Schema } from "mongoose";
import User from "@/models/user";
import Checkpoint from "@/models/checkpoint";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    checkpoints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Checkpoint",
      },
    ],
  },
  { timestamps: true }
);

const Event = models.Event || mongoose.model("Event", userSchema);
export default Event;
