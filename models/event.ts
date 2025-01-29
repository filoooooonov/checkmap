import mongoose, { models, Schema } from "mongoose";
import User from "@/models/user";
import Checkpoint from "@/models/checkpoint";

export interface IEvent extends Document {
  name: string;
  description: string;
  eventCode: string;
  creatorId: mongoose.Types.ObjectId;
  checkpoints: mongoose.Types.ObjectId[];
  startDate: string;
  primaryColor: string;
  fontColor: string;
}

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    eventCode: {
      type: String,
      required: true,
      unique: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
    },
    primaryColor: {
      type: String,
      required: false,
    },
    fontColor: {
      type: String,
      required: false,
    },
    checkpoints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Checkpoint",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Event = models.Event || mongoose.model("Event", eventSchema);
export default Event;
