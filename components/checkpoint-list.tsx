"use client";

import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkpoint } from "@/app/[eventCode]/page";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { IEvent } from "@/models/event";
import { lightenColor } from "@/utils/utils";
import { format } from "date-fns";
import { MdCalendarMonth } from "react-icons/md";

interface CheckpointListProps {
  eventData: IEvent;
  onClose?: () => void;
  checkpoints: Checkpoint[];
  setShowForm: () => void;
}

export function CheckpointList({
  eventData,
  onClose,
  checkpoints,
  setShowForm,
}: CheckpointListProps) {
  const { data: session } = useSession();
  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ChevronRight
            size={10}
            className="icon-btn"
            style={{ color: eventData.fontColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = eventData.fontColor;
              e.currentTarget.style.backgroundColor = lightenColor(
                eventData.primaryColor,
                10
              );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onClick={onClose}
          />
          <h2 className="text-2xl font-bold">{eventData.name}</h2>
        </div>
        <span
          className="px-4 font-semibold py-1 rounded-lg flex items-center gap-2"
          style={{ backgroundColor: lightenColor(eventData.primaryColor, 10) }}
        >
          <MdCalendarMonth />
          {format(new Date(eventData.startDate), "MMM d, HH:mm")}
        </span>
      </div>
      <p className="mt-4 mb-12">{eventData.description}</p>
      <h3 className="text-xl font-semibold">All checkpoints</h3>
      {session && session.user.id === eventData.creatorId.toString() && (
        <div className="flex mt-4 mb-4">
          <Button onClick={setShowForm} className="flex items-center gap-2">
            <Plus />
            New checkpoint
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {checkpoints.map((checkpoint) => (
          <Button
            key={checkpoint.id}
            style={{ color: eventData.fontColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = lightenColor(
                eventData.primaryColor,
                5
              );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            className="bg-transparent w-full justify-start gap-2 shadow-none duration-300"
          >
            <MapPin className="h-4 w-4" />
            {checkpoint.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
