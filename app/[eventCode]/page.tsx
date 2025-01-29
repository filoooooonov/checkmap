import { LatLngTuple } from "leaflet";
import { Header } from "@/components/header";
import MapView from "./MapView";
import { connectMongoDB } from "@/utils/mongo";
import Event from "@/models/event";
import { getEventData } from "@/actions/getEventData";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface Checkpoint {
  id: number;
  name: string;
  description?: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  event: string;
  images: string[];
}
export default async function Page({
  params,
}: {
  params: Promise<{ eventCode: string }>;
}) {
  const eventCode = (await params).eventCode;

  const eventData = await getEventData(eventCode);

  return (
    <>
      <div className="max-h-screen">
        <Header eventData={eventData} />
        <div>
          {eventData ? (
            <MapView eventData={eventData} />
          ) : (
            <div className="flex w-full h-[80vh] items-center justify-center">
              <div className="flex flex-col gap-4">
                <h2 className="text-8xl font-bold text-center">404</h2>
                <span className=" font-medium">
                  Looks like we couldn't find the event you're looking for.
                </span>
                <Link href="/" className="mx-auto mt-4">
                  <Button className="w-max">Go home</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
