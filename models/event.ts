import mongoose, { models, Schema } from "mongoose";
import User from "@/models/user";
import Checkpoint from "@/models/checkpoint";

export interface IEvent extends Document {
  name: string;
  creatorId: mongoose.Types.ObjectId;
  checkpoints: mongoose.Types.ObjectId[];
}

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

const Event = models.Event || mongoose.model("Event", eventSchema);
export default Event;
