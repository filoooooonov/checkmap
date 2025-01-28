"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CheckpointFormProps {
  onBack: () => void;
}

export function CheckpointForm({ onBack }: CheckpointFormProps) {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [pinCoordinates, setPinCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([60.1879057,24.8224665], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      mapRef.current.on("move", () => {
        const center = mapRef.current!.getCenter();
        setPinCoordinates({ lat: center.lat, lon: center.lng });
      });
    }
  }, []);

  useEffect(() => {
    if (coordinates && mapRef.current) {
      mapRef.current.setView([coordinates.lat, coordinates.lon], 13);
    }
  }, [coordinates]);

  const handleSearch = async () => {
    if (address.length > 3) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
      }
    }
  };

  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="icon-btn">
          <ChevronRight size={20} />
        </button>
        <h2 className="text-2xl font-bold">New checkpoint</h2>
      </div>
      <div className="space-y-2">
        <Input id="name" placeholder="Checkpoint name*" />
      </div>
      <div className="space-y-2">
        <Textarea
          id="description"
          placeholder="Description"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        {coordinates && (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lon}</p>
          </div>
        )}
        <div id="map" style={{ height: "200px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              pointerEvents: "none"
            }}
          >
            <div style={{ backgroundColor: "red", width: "12px", height: "12px", borderRadius: "50%" }}></div>
          </div>
        </div>
        {pinCoordinates && (
          <div>
            <p>Pin Latitude: {pinCoordinates.lat}</p>
            <p>Pin Longitude: {pinCoordinates.lon}</p>
          </div>
        )}
      </div>
      <Button className="w-full">Save checkpoint</Button>
    </div>
  );
}
