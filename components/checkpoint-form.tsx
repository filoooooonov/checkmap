"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { addCheckpoint } from "@/actions/addCheckpoint";

interface CheckpointFormProps {
  onBack: () => void;
  eventId: string;
}

export function CheckpointForm({ onBack, eventId }: CheckpointFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }>({
    lat: 60.1879057,
    lon: 24.8224665,
  });
  const [pinCoordinates, setPinCoordinates] = useState<{
    lat: number;
    lon: number;
  }>({
    lat: 60.1879057,
    lon: 24.8224665,
  });
  const mapRef = useRef<L.Map | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([60.1879057, 24.8224665], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileReaders: FileReader[] = [];
      const imagePromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result.toString());
            } else {
              reject("Failed to read file");
            }
          };
          reader.readAsDataURL(file);
          fileReaders.push(reader);
        });
      });

      Promise.all(imagePromises)
        .then((base64Images) => {
          setImages((prevImages) => [...prevImages, ...base64Images]);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCoordinates) return;

    try {
      const checkpointData = {
        name,
        description,
        location: {
          type: "Point",
          coordinates: [pinCoordinates.lat, pinCoordinates.lon] as [
            number,
            number
          ],
        },
        event: eventId,
        images,
      };

      await addCheckpoint(checkpointData);
      alert("Checkpoint added successfully!");
      onBack();
    } catch (error) {
      console.error("Error adding checkpoint:", error);
      alert("Failed to add checkpoint.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 space-y-6">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="icon-btn">
          <ChevronRight size={20} />
        </button>
        <h2 className="text-2xl font-bold">New checkpoint</h2>
      </div>
      <div className="space-y-2">
        <Input
          id="name"
          placeholder="Checkpoint name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Textarea
          id="description"
          placeholder="Description"
          className="min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div id="map" style={{ height: "200px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        </div>
        <div id="imageinput">
          <Input
            id="provideImage"
            placeholder="Select Images"
            multiple
            type="file"
            className="cursor-pointer bg-hover:bg-gray-100"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Save checkpoint
      </Button>
    </form>
  );
}
