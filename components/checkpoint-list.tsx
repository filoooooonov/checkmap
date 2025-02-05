"use client";

import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkpoint } from "@/app/[eventCode]/page";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { IEvent } from "@/models/event";
import { lightenColor } from "@/utils/utils";
import { TbTrash } from "react-icons/tb";
import { deleteCheckpoint } from "@/actions/deleteCheckpoint";
import { useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { formatDate } from "date-fns";

interface CheckpointListProps {
  eventData: IEvent;
  onClose?: () => void;
  checkpoints: Checkpoint[];
  setShowForm: () => void;
}

export function CheckpointList({
  eventData,
  onClose,
  checkpoints: initialCheckpoints,
  setShowForm,
}: CheckpointListProps) {
  const { data: session } = useSession();
  const [checkpoints, setCheckpoints] = useState(initialCheckpoints);

  const handleDelete = async (id: string) => {
    try {
      await deleteCheckpoint(id);
      setCheckpoints(checkpoints.filter((checkpoint) => checkpoint._id !== id));
    } catch (error) {
      console.error("Error deleting checkpoint:", error);
    }
  };

  return (
    <div className="">
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
          className="hidden px-4 font-semibold py-1 rounded-lg md:flex items-center gap-2"
          style={{ backgroundColor: lightenColor(eventData.primaryColor, 10) }}
        >
          <MdCalendarMonth />
          {formatDate(new Date(eventData.startDate), "MMM d, HH:mm")}
        </span>
      </div>
      <span
        className="flex px-4 font-semibold py-1 rounded-lg md:hidden items-center gap-2 w-max"
        style={{ backgroundColor: lightenColor(eventData.primaryColor, 10) }}
      >
        <MdCalendarMonth />
        {formatDate(new Date(eventData.startDate), "MMM d, HH:mm")}
      </span>
      <p className="mt-4 mb-12">{eventData.description}</p>
      <h3 className="text-xl font-semibold">All checkpoints</h3>

      <div>
        {checkpoints.map((checkpoint) => {
          console.log("Checkpoint:", checkpoint); // Log the checkpoint object
          return (
            <div key={checkpoint._id} className="flex items-center gap-2">
              <button
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
                className="bg-transparent w-full justify-start gap-2 shadow-none duration-300 flex items-center p-2 rounded-xl"
              >
                <MapPin className="h-4 w-4" />
                {checkpoint.name}
              </button>
              {checkpoint._id &&
                session?.user.id === eventData.creatorId.toString() && (
                  <TbTrash
                    onClick={() => handleDelete(checkpoint._id.toString())}
                    className="cursor-pointer text-neutral-700 hover:text-red-500 duration-300"
                  />
                )}
            </div>
          );
        })}
        {session && session.user.id === eventData.creatorId.toString() && (
          <div className="flex mt-2 mb-4">
            <Button
              variant="outline"
              onClick={setShowForm}
              className="flex items-center gap-2"
            >
              <Plus />
              New checkpoint
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
