import mongoose, { models, Schema } from "mongoose";
import Event from "@/models/event";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  events: mongoose.Types.ObjectId[];
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
