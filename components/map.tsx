"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useState } from "react";
import CheckpointData from "./checkpoint-data";
import L from "leaflet";

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
        <Marker
          key={userLocation.id}
          position={userLocation.coords}
          icon={L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}
          eventHandlers={{
            click: () => handleMarkerClick(userLocation),
          }}
        >
          <Popup>{userLocation.name}</Popup>
        </Marker>
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
