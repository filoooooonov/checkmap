import mongoose, { models, Schema } from "mongoose";
import Event from "@/models/event";

const checkpointSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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
  models.Checkpoint || mongoose.model("Checkpoint", checkpointSchema);
export default Checkpoint;
