"use client";

import { Plus, Share2, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarWithDropdown,
} from "@/components/ui/avatar";
import { IEvent } from "@/models/event";
import { toast, Toaster } from "sonner";

export function Header({ eventData }: { eventData?: IEvent }) {
  function CopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <header className="flex items-center justify-between p-2 px-8">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold">Checkmap</h1>
        </div>
        {eventData && (
          <h2 className="text-lg font-semibold">{eventData.name}</h2>
        )}

        <div className="flex items-center gap-4">
          {eventData ? (
            <Button
              onClick={CopyLink}
              variant="default"
              size="sm"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          ) : (
            // TODO: onClick to new event page
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create event
            </Button>
          )}

          <AvatarWithDropdown />
        </div>
      </header>
    </>
  );
}
