import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/user";
import { connectMongoDB } from "@/utils/mongo";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Destructure necessary fields from the body
    const { name, password, email } = body;

    // Validate required fields
    if (!name || !password || !email) {
      return NextResponse.json(
        { error: "Missing required fields: eventCode, name, creatorId, or date" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }
    // Create a new event instance
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      events: [],
    });

    // Save the event to the database
    await newUser.save();

    // Respond with the created event
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    // Explicitly cast the error to `Error`
    const err = error as Error;
  
    console.error("Error adding user:", err.message);
  
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}