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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
      {checkpoints.length >= 0 ? (
        <MapLoader
          center={[60.1699, 24.9384]}
          eventData={eventData}
          checkpoints={checkpoints}
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
            className="absolute top-0 right-0 h-full w-1/4 shadow-lg z-20 p-4 m-2 rounded-xl"
            style={{
              color: eventData.fontColor,
              backgroundColor: eventData.primaryColor,
              border: `2px solid ${lightenColor(eventData.primaryColor, 20)}`,
            }}
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
