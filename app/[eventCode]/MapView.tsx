"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MapLoader from "@/components/MapLoader";
import { CheckpointForm } from "@/components/checkpoint-form";
import { CheckpointList } from "@/components/checkpoint-list";
import { Checkpoint } from "./page";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IEvent } from "@/models/event";
import { lightenColor } from "@/utils/utils";
import { getCheckpoints } from "@/actions/getCheckpoints";

export default function MapView({ eventData }: { eventData: IEvent }) {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

  useEffect(() => {
    async function fetchCheckpoints() {
      const fetchedCheckpoints = await getCheckpoints(eventData.eventCode);
      setCheckpoints(fetchedCheckpoints);
    }
    fetchCheckpoints();
  }, [eventData.eventCode]);

  const [userLocation, setUserLocation] = useState<Checkpoint>({
    id: 0,
    coords: [60.1699, 24.9384],
    name: "Your location",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({
            id: 0,
            coords: [latitude, longitude],
            name: "Your location",
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true, // Use high-accuracy mode
          timeout: 5000,
          maximumAge: 0, // Prevent caching old positions
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <main className="relative overflow-hidden">
      {checkpoints.length > 0 ? (
        <MapLoader
          center={[60.1699, 24.9384]}
          checkpoints={checkpoints}
          userLocation={userLocation}
          primaryColor={eventData.primaryColor}
        />
      ) : (
        <div>Loading checkpoints...</div>
      )}
      <div className="absolute top-4 right-4 z-10 flex gap-6">
        {!showList && (
          <Button
            className=" shadow-neutral-300 bg-white border-2 border-neutral-200 hover:bg-neutral-100 duration-300 rounded-full aspect-square p-2"
            onClick={() => setShowList(true)}
          >
            <Menu size={24} className="text-black" />
          </Button>
        )}
      </div>
      <AnimatePresence>
        {(showForm || showList) && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 right-0 h-full w-1/4 bg-white shadow-lg z-20 p-4"
          >
            {showForm && (
              <CheckpointForm
                eventId={eventData.eventCode}
                onBack={() => setShowForm(false)}
              />
            )}
            {showList && (
              <CheckpointList
                eventData={eventData}
                onClose={() => setShowList(false)}
                setShowForm={() => {
                  setShowForm(true);
                  setShowList(false);
                }}
                checkpoints={checkpoints}
              />
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
