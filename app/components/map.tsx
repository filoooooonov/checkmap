"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Checkpoint } from "../page";

interface MapProps {
  center: LatLngExpression | LatLngTuple;
  checkpoints: Checkpoint[];
  zoom?: number;
}

const defaults = {
  zoom: 12,
};

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, checkpoints, center } = Map;

  return (
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
          draggable={false}
        >
          <Popup>{checkpoint.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
