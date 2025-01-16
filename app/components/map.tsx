"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  center: LatLngExpression | LatLngTuple;
  checkpoints: LatLngTuple[];
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
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {checkpoints.map((coords) => (
        <Marker position={coords} draggable={false}>
          <Popup>Checkpoint name</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
