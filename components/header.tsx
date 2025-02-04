"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarWithDropdown } from "@/components/ui/avatar";
import { IEvent } from "@/models/event";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MdEdit } from "react-icons/md";
import EditEventForm from "./editEventForm";
import AddEventForm from "./addEvent-form";
import { useState } from "react";
import Logo from "./Logo";
import { lightenColor } from "@/utils/utils";
import { LuCopy } from "react-icons/lu";

export function Header({
  eventData,
  transparent = false,
  links = false,
}: {
  eventData?: IEvent;
  transparent?: boolean;
  links?: boolean;
}) {
  const { data: session } = useSession();
  const [editNameDialog, setEditNameDialog] = useState(false);
  const [createEvenetDialog, setCreateEvenetDialog] = useState(false);
  function CopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  // const bgColor = eventData?.primaryColor || "#fefff2";
  const bgColor = "#fefff2";

  return (
    <>
      <Toaster position="bottom-center" />
      <header
        className={`absolute top-0 left-0 z-50 w-full flex items-center justify-between p-2 h-[6vh] px-4 lg:px-8 gap-2 ${
          !transparent && "bg-background bg-opacity-70 backdrop-blur-md"
        } `}
      >
        {/* Left side */}
        <Logo fontColor={eventData?.fontColor || "#000000"} />

        {/* Event name */}
        <div>
          {eventData && (
            <div className="hidden md:flex items-center gap-2">
              <h2
                className="text-lg font-mono font-semibold"
                style={{ color: eventData.fontColor }}
              >
                {eventData.name}
              </h2>
              {/* Edit button */}
              {session?.user?.id === eventData.creatorId.toString() && (
                <Dialog open={editNameDialog} onOpenChange={setEditNameDialog}>
                  <DialogTrigger>
                    <MdEdit
                      size={30}
                      onClick={() => setEditNameDialog(!editNameDialog)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "50%",
                        cursor: "pointer",
                        color: eventData.fontColor,
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = lightenColor(
                          bgColor,
                          10
                        );
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    />
                  </DialogTrigger>
                  <DialogContent className="w-max">
                    <DialogHeader>
                      <DialogTitle>Edit event name</DialogTitle>
                      <EditEventForm
                        setOpen={setEditNameDialog}
                        eventCode={eventData.eventCode}
                        currentName={eventData.name}
                      />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
          {links && !eventData && (
            <div className="hidden md:flex gap-2">
              <Link
                href="/"
                className="text-primary font-medium font-mono hover:bg-primary/10 duration-300 rounded-xl px-4 py-2"
              >
                Browse
              </Link>
              <Link
                href="/"
                className="text-primary font-medium font-mono hover:bg-primary/10 duration-300 rounded-xl px-4 py-2"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-primary font-medium font-mono hover:bg-primary/10 duration-300 rounded-xl px-4 py-2"
              >
                Pricing
              </Link>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {eventData && (
            <Button
              onClick={CopyLink}
              variant="default"
              size="sm"
              className="gap-2"
            >
              <LuCopy className="h-4 w-4" />
              Copy link
            </Button>
          )}

          {!eventData && session && (
            // TODO: onClick to new event page
            /*<Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create event
            </Button>*/
            <h3>
              <Dialog
                open={createEvenetDialog}
                onOpenChange={setCreateEvenetDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2"
                    onClick={() => setCreateEvenetDialog(!createEvenetDialog)}
                  >
                    <Plus className="h-4 w-4" />
                    Create event
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-auto">
                  <DialogHeader>
                    <DialogTitle>Create new event</DialogTitle>
                  </DialogHeader>
                  <AddEventForm setOpen={setCreateEvenetDialog} />
                </DialogContent>
              </Dialog>
            </h3>
          )}
          {session ? (
            <AvatarWithDropdown />
          ) : (
            <>
              <Link
                href="\login"
                className="block px-4 py-2 bg-primary/5 hover:bg-primary/10 duration-300 font-medium text-sm rounded-xl cursor-pointer"
              >
                Login
              </Link>
              <Link href="\register">
                <Button className="block px-4 py-2 duration-300 font-medium text-sm rounded-xl cursor-pointer">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}
