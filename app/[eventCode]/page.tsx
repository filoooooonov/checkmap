import { LatLngTuple } from "leaflet";
import { Header } from "@/components/header";
import MapView from "./MapView";
import { connectMongoDB } from "@/utils/mongo";
import Event from "@/models/event";

export interface Checkpoint {
  id: number;
  coords: LatLngTuple;
  name: string;
}

async function getEventData(eventCode: string) {
  await connectMongoDB();

  const event = await Event.findOne({ eventCode })
    .populate("creatorId")
    .populate("checkpoints");

  if (!event) return null;
  else {
    // Convert the event to objects to avoid Next.js errors
    const eventObject = event.toObject();
    eventObject._id = eventObject._id.toString();

    return eventObject;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ eventCode: string }>;
}) {
  const eventCode = (await params).eventCode;

  const eventData = await getEventData(eventCode);

  console.log("EVENT DATA ", eventData);

  return (
    <>
      <div>
        <Header eventData={eventData} />
        <MapView />
      </div>
    </>
  );
}
