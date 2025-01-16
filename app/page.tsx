"use client";

import { useState } from "react";
import { Header } from "./components/header";
import { MapView } from "./components/map-view";
import { CheckpointForm } from "./components/checkpoint-form";
import { CheckpointList } from "./components/checkpoint-list";

export default function CheckpointMap() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNewCheckpointForm, setShowNewCheckpointForm] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 transition-all duration-300 ease-in-out">
        <MapView
          onNewCheckpoint={() => {
            setShowNewCheckpointForm(true);
            setShowSidebar(true);
          }}
          isSidebarOpen={showSidebar}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[400px] border-l bg-background overflow-auto transition-transform duration-300 ease-in-out ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {showNewCheckpointForm ? (
            <CheckpointForm onBack={() => setShowNewCheckpointForm(false)} />
          ) : (
            <CheckpointList />
          )}
        </div>
      </main>
    </div>
  );
}
