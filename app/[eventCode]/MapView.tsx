"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MapLoader from "@/components/MapLoader";
import { CheckpointForm } from "@/components/checkpoint-form";
import { CheckpointList } from "@/components/checkpoint-list";
import { Checkpoint } from "./page";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function MapView() {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);

  const checkpoints: Checkpoint[] = [
    {
      id: 1,
      coords: [60.1841, 24.8301],
      name: "Otaniemi",
    },
    {
      id: 2,
      coords: [60.2417, 24.8854],
      name: "Kannelmäki",
    },
    {
      id: 3,
      coords: [60.2108, 25.0805],
      name: "Itäkeskus",
    },
    {
      id: 4,
      coords: [60.18587105372319, 24.83476776131922],
      name: "Otaniemi Sports Park",
    },
    {
      id: 5,
      coords: [60.187556632736374, 24.835025253385037],
      name: "Otaniemi JMT1",
    },
    {
      id: 6,
      coords: [60.18975414452264, 24.83719152849063],
      name: "Otaniemi Chapel",
    },
  ];

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
      <MapLoader
        center={[60.1699, 24.9384]}
        checkpoints={checkpoints}
        userLocation={userLocation}
      />
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
            {showForm && <CheckpointForm onBack={() => setShowForm(false)} />}
            {showList && (
              <CheckpointList
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
