"use client";

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
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
  userLocation: Checkpoint;
  zoom?: number;
}

const defaults = {
  zoom: 12,
};

const Map = ({ zoom = defaults.zoom, checkpoints, center, userLocation }: MapProps) => {
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
        <CircleMarker
          key={userLocation.id}
          center={userLocation.coords}
          radius={5}
          color="#3274A3"
          fillColor="#2A81CB"
          fillOpacity={0.7}
          eventHandlers={{
            click: () => handleMarkerClick(userLocation),
          }}
        >
          <Popup>{userLocation.name}</Popup>
        </CircleMarker>
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
