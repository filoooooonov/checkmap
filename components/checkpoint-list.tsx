"use client";

import { MapPin, Plus, Search } from "lucide-react";
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
import { Input } from "./ui/input";

interface CheckpointListProps {
  eventData: IEvent;
  onClose?: () => void;
  checkpoints: Checkpoint[];
  setShowForm: () => void;
  setCheckpoints: (checkpoints: Checkpoint[]) => void;
}

export function CheckpointList({
  eventData,
  onClose,
  checkpoints,
  setShowForm,
  setCheckpoints,
}: CheckpointListProps) {
  const { data: session } = useSession();

  const handleDelete = async (id: string) => {
    try {
      await deleteCheckpoint(id);
      setCheckpoints([
        ...checkpoints.filter((checkpoint) => checkpoint._id !== id),
      ]);
    } catch (error) {
      console.error("Error deleting checkpoint:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ChevronRight size={8} className="icon-btn" onClick={onClose} />
          <h2 className="text-2xl font-bold">{eventData.name}</h2>
        </div>
        <span
          className="text-xs hidden px-2 py-1 rounded-lg md:flex items-center gap-2"
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

      <div>
        <h3 className="sidebar-heading pl-2">All checkpoints</h3>

        <div className="relative flex items-center w-full mt-2 mb-6">
          <Input
            type="text"
            autoComplete="off"
            placeholder="Search checkpoints"
            className="pl-10"
          />
          <Search className="absolute left-3 size-4 text-neutral-500" />
        </div>

        {checkpoints.map((checkpoint) => {
          console.log("Checkpoint:", checkpoint); // Log the checkpoint object
          return (
            <div key={checkpoint._id} className="flex items-center gap-2">
              <button className="bg-transparent text-primary hover:bg-primary/5 w-full justify-start gap-2 shadow-none duration-300 flex items-center p-2 px-4 rounded-xl">
                <MapPin className="size-4" />
                <div className="flex flex-col text-left">
                  {checkpoint.name}
                  <span className="text-primary/50 text-sm">400 m</span>
                </div>
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
              className="flex items-center gap-2 w-full"
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
