"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { Checkpoint } from "@/app/[eventCode]/page";

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
  userLocation: Checkpoint;
  primaryColor: string;
}

const MapLoader = ({
  center,
  checkpoints,
  userLocation,
  primaryColor,
}: MapLoaderProps) => {
  return (
    <Map
      center={center}
      checkpoints={checkpoints}
      userLocation={userLocation}
      primaryColor={primaryColor}
    />
  );
};

export default MapLoader;
