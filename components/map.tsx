"use client";

import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useState, useEffect } from "react";
import CheckpointData from "./checkpoint-data";
import "leaflet-routing-machine";
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

const createNumberedIcon = (number: Number) =>
  L.divIcon({
    className: "custom-div-icon",
    html: `<div class="marker-number">${number}</div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

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
            icon={createNumberedIcon(checkpoint.id)}
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

        {selectedCheckpoint && <Routing start={userLocation.coords} end={selectedCheckpoint.coords} />}
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

const Routing = ({ start, end }: { start: LatLngTuple; end: LatLngTuple }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      show: false, // disable itinerary (but it doesn't work)
      addWaypoints: false, // can't add waypoints along the route
      plan: L.Routing.plan([L.latLng(start[0], start[1]), L.latLng(end[0], end[1])], {createMarker: () => false}),
      router: L.Routing.osrmv1({
        profile: 'foot', // Use the "foot" profile for walking routes
      }),
    }).addTo(map);

    // hide the itinerary control explicitly if `show: false` doesn't work
    const itineraryElement = document.querySelector(".leaflet-routing-container") as HTMLElement;
    if (itineraryElement) {
      itineraryElement.style.display = "none";
    }

    return () => {
      map.removeControl(routingControl);
    };
  }, [start, end, map]);

  return null;
};

export default Map;
