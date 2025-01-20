import mongoose, { models, Schema } from "mongoose";
import Event from "@/models/event";

const Checkpoint = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      // TODO: Define proper type
      type: String,
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  { timestamps: true }
);

const Checkpoint =
  models.Checkpoint || mongoose.model("Checkpoint", userSchema);
export default Checkpoint;
