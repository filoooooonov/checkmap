"use client";

import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapViewProps {
  onNewCheckpoint: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function MapView({
  onNewCheckpoint,
  isSidebarOpen,
  toggleSidebar,
}: MapViewProps) {
  return (
    <div
      className={`relative h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-[calc(100%-400px)]" : "w-full"
      }`}
    >
      <img
        src="/placeholder.svg?height=800&width=1200"
        alt="Map"
        className="h-full w-full object-cover"
      />
      <Button
        onClick={onNewCheckpoint}
        className="absolute right-4 top-4 gap-2"
      >
        <Plus className="h-4 w-4" />
        New checkpoint
      </Button>
      <Button
        onClick={toggleSidebar}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-gray-100"
        variant="ghost"
        size="icon"
      >
        {isSidebarOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
