import { LatLngTuple } from "leaflet";
import { Header } from "@/components/header";
import MapView from "./MapView";
import { connectMongoDB } from "@/utils/mongo";
import Event from "@/models/event";
import { getEventData } from "@/actions/getEventData";

export interface Checkpoint {
  id: number;
  coords: LatLngTuple;
  name: string;
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
