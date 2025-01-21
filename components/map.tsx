"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useState } from "react";
import CheckpointData from "./checkpoint-data";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Checkpoint } from "@/app/[eventCode]/page";

interface MapProps {
  center: LatLngExpression | LatLngTuple;
  checkpoints: Checkpoint[];
  zoom?: number;
}

const defaults = {
  zoom: 12,
};

const Map = ({ zoom = defaults.zoom, checkpoints, center }: MapProps) => {
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<Checkpoint | null>(null);

  const handleMarkerClick = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
  };

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {checkpoints.map((checkpoint) => (
          <Marker
            key={checkpoint.id}
            position={checkpoint.coords}
            eventHandlers={{
              click: () => handleMarkerClick(checkpoint),
            }}
          >
            <Popup>{checkpoint.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedCheckpoint && (
        <CheckpointData
          checkpoint={selectedCheckpoint}
          onClose={() => setSelectedCheckpoint(null)}
        />
      )}
    </div>
  );
};

export default Map;
