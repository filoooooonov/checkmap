"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { Checkpoint } from "../page";

const Map = dynamic(() => import("./map"), {
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ),
  ssr: false,
});

interface MapLoaderProps {
  center: LatLngExpression | LatLngTuple;
  checkpoints: Checkpoint[];
}

const MapLoader = ({ center, checkpoints }: MapLoaderProps) => {
  return <Map center={center} checkpoints={checkpoints} />;
};

export default MapLoader;
