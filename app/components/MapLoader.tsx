"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { LatLngExpression, LatLngTuple } from "leaflet";

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
  checkpoint: LatLngExpression | LatLngTuple;
}

const MapLoader = ({ center, checkpoint }: MapLoaderProps) => {
  return <Map center={center} checkpoint={checkpoint} />;
};

export default MapLoader;
