import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Event from "@/models/event";
import { connectMongoDB } from "@/utils/mongo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventCode = searchParams.get("eventCode");

  if (!eventCode) {
    return NextResponse.json(
      { error: "Event code is required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const event = await Event.findOne({ eventCode })
      .populate("creatorId")
      .populate("checkpoints");
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
