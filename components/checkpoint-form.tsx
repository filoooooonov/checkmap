"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Image, Search } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { addCheckpoint } from "@/actions/addCheckpoint";
import { toast, Toaster } from "sonner";
import { IoSearchSharp } from "react-icons/io5";
import { IEvent } from "@/models/event";
import { useRouter } from "next/navigation";
import { FaBuilding, FaTimes } from "react-icons/fa";
import { MdForest } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";

interface CheckpointFormProps {
  onBack: () => void;
  eventCode: string;
  eventData: IEvent;
}

export function CheckpointForm({
  onBack,
  eventCode,
  eventData,
}: CheckpointFormProps) {
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
  }>({ lat: 60.1879057, lon: 24.8224665 });
  const mapRef = useRef<L.Map | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isInside, setIsInside] = useState(false);
  const router = useRouter();

  // Show the map
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([60.1879057, 24.8224665], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );

      mapRef.current.on("move", () => {
        const center = mapRef.current!.getCenter();
        setPinCoordinates({ lat: center.lat, lon: center.lng });
      });
    }
  }, []);

  // Setting coordinates
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
        event: eventCode,
        images,
        isInside,
      };

      await addCheckpoint(checkpointData);
      router.refresh();
      toast.success("Checkpoint added successfully!");
      onBack();
    } catch (error) {
      console.error("Error adding checkpoint:", error);
      toast.error("Failed to add checkpoint.");
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-20">
      <div className="flex items-center gap-2">
        <button onClick={onBack}>
          <ChevronRight className="icon-btn" />
        </button>
        <h2 className="text-2xl font-bold">New checkpoint</h2>
      </div>
      <div className="space-y-4 mt-4 mb-8">
        <div>
          <div className="rounded-2xl bg-primary/5 p-2">
            <div
              className={`grid gap-4 ${images.length > 1 ? "grid-cols-2" : ""}`}
            >
              {images.map((imgSrc, index) => (
                <div key={index} className="relative">
                  <img
                    src={imgSrc}
                    alt={`Preview ${index}`}
                    className="rounded-lg mb-4 w-full h-auto"
                  />
                  <FaTimes
                    className="absolute top-2 right-2 text-red-500 cursor-pointer"
                    onClick={() => {
                      setImages(images.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className="cursor-pointer h-32 flex flex-col gap-4 items-center justify-center border-dashed border-2 border-primary/30 rounded-lg"
              onClick={handleDivClick}
            >
              <MdOutlineFileUpload size={30} />
              <span className="text-gray-500">Click to select images</span>
            </div>
            <Input
              id="provideImage"
              ref={fileInputRef}
              multiple
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <Input
          id="name"
          placeholder="Checkpoint name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          id="description"
          placeholder="Description"
          className="min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        <p className="sidebar-heading">Location</p>
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-between w-full">
            <Input
              type="address"
              autoComplete="off"
              placeholder="Search address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 size-4 text-neutral-500" />
          </div>
          <Button
            type="button"
            onClick={handleSearch}
            className="flex items-center gap-2"
          >
            <IoSearchSharp />
            Search
          </Button>
        </div>

        <div
          id="map"
          style={{
            height: "200px",
            position: "relative",
            borderRadius: "16px",
          }}
        >
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
      </div>
      <div className="space-y-2 my-8">
        <div className="flex gap-4">
          <div
            className={`flex flex-col gap-2 items-center text-center cursor-pointer shadow-lg shadow-primary/10 p-4 w-full rounded-lg ${
              isInside
                ? "bg-primary/5 border border-primary/40"
                : "bg-primary/10 border border-primary/10"
            }`}
            onClick={() => setIsInside(true)}
          >
            <FaBuilding className="text-primary size-8" />
            Indoor
          </div>
          <div
            className={`flex flex-col gap-2 items-center text-center cursor-pointer p-4 w-full rounded-lg ${
              !isInside
                ? "bg-primary/5 border border-primary/60"
                : "bg-primary/10 border border-primary/10"
            }`}
            onClick={() => setIsInside(false)}
          >
            <MdForest className="text-primary size-8" />
            Outdoor
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Add checkpoint
      </Button>
    </form>
  );
}
