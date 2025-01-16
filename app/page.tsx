"use client";

import { Button } from "@/components/ui/button";
import { CheckpointList } from "./components/checkpoint-list";
import MapLoader from "./components/MapLoader";
import { useState } from "react";
import { CheckpointForm } from "./components/checkpoint-form";
import { LatLngTuple } from "leaflet";

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);

  const checkpoints: LatLngTuple[] = [
    [60.1841, 24.8301],
    [60.2417, 24.8854],
    [60.2108, 25.0805],
  ];

  return (
    <>
      <div className="flex">
        <main
          className={`relative w-full flex-1 bg-white-700 mx-auto overflow-hidden ${
            !(showForm || showList) ? "w-full" : ""
          }`}
        >
          <MapLoader center={[60.1699, 24.9384]} checkpoints={checkpoints} />
          <Button
            className="absolute top-4 right-4 z-10"
            onClick={() => setShowForm(true)}
          >
            New checkpoint
          </Button>
        </main>
        {(showForm || showList) && (
          <aside className="w-1/4 bg-gray-100 p-4">
            {showForm && <CheckpointForm onBack={() => setShowForm(false)} />}
            {showList && <CheckpointList />}
          </aside>
        )}
      </div>
    </>
  );
}
