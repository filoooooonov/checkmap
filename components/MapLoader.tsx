"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { Checkpoint } from "@/app/[eventCode]/page";
import { IEvent } from "@/models/event";

const Map = dynamic(() => import("./mapTiler"), {
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ),
  ssr: false,
});

interface MapLoaderProps {
  center: LatLngTuple;
  checkpoints: Checkpoint[];
  primaryColor: string;
  eventData: IEvent;
}

const MapLoader = ({
  center,
  checkpoints,
  primaryColor,
  eventData,
}: MapLoaderProps) => {
  return (
    <Map
      center={center}
      checkpoints={checkpoints}
      primaryColor={primaryColor}
      eventData={eventData}
    />
  );
};

export default MapLoader;
