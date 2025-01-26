import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import IEvent from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Destructure necessary fields from the body
    const { name, description, eventCode, creatorId, checkpoints } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: "The event needs a name" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectMongoDB();

    const newEvent = new IEvent({
      name,
      description,
      eventCode,
      creatorId,
      checkpoints:[],
    });

    // Save the event to the database
    await newEvent.save();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    // Explicitly cast the error to `Error`
    const err = error as Error;
  
    console.error("Error adding event:", err.message);
  
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}