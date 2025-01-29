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
      type: { 
        type: String, 
        enum: ['Point'], 
        required: true, 
      }, 
      coordinates: { 
        type: [Number], 
        required: true, 
      }, 
    }, 
    event: { 
      type: [String], // Just pass the event code
      required: true,
    }, 
    images: { 
      type: [String], // Array of image URLs 
      required: false, 
    }, 
  }, 
  { timestamps: true } 
); 
 
checkpointSchema.index({ location: '2dsphere' }); 
 
const Checkpoint = 
  models.Checkpoint || mongoose.model("Checkpoint", checkpointSchema); 
export default Checkpoint;