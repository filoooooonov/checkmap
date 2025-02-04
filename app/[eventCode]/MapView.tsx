"use client";

import React, { useState, useEffect, useRef } from "react";
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

export default function MapView({
  eventData,
  checkpoints,
}: {
  eventData: IEvent;
  checkpoints: Checkpoint[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // To close sidebars on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowRightSidebar(false);
        setShowForm(false);
        setShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowForm, setShowList]);

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
      <div className="absolute top-20 right-2 lg:right-4 z-10 flex gap-6">
        {!showRightSidebar && (
          <button
            className=" shadow-neutral-300 bg-white border-2 border-neutral-200 hover:bg-neutral-100 duration-300 rounded-full aspect-square p-2"
            onClick={() => {
              setShowRightSidebar(true);
              setShowList(true);
            }}
          >
            <Menu size={16} className="text-black" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {showRightSidebar && (
          <motion.aside
            ref={ref}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 right-0 h-full w-3/4 lg:w-1/4 shadow-lg z-20 p-4 m-2 mt-16 rounded-xl bg-background bg-opacity-90 backdrop-blur-md"
            style={{
              color: eventData.fontColor,
              border: `2px solid ${lightenColor(eventData.primaryColor, 20)}`,
            }}
          >
            {showForm && (
              <CheckpointForm
                eventCode={eventData.eventCode}
                eventData={eventData}
                onBack={() => {
                  setShowForm(false);
                  setShowList(true);
                }}
              />
            )}
            {showList && (
              <CheckpointList
                eventData={eventData}
                onClose={() => setShowRightSidebar(false)}
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
