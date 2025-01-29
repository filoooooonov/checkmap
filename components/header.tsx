"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
export function Header({ eventData }: { eventData?: IEvent }) {
  const { data: session } = useSession();
  const [editNameDialog, setEditNameDialog] = useState(false);
  const [createEvenetDialog, setCreateEvenetDialog] = useState(false);
  function CopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  function isDark(hexColor: string) {
    const stripped = hexColor.replace("#", "");
    const r = parseInt(stripped.substring(0, 2), 16);
    const g = parseInt(stripped.substring(2, 4), 16);
    const b = parseInt(stripped.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }

  function lightenColor(hex: string, percent: number) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  const bgColor = eventData?.primaryColor || "#ffffff";

  return (
    <>
      <Toaster position="bottom-center" />
      <header
        style={eventData ? { backgroundColor: bgColor } : {}}
        className={`${
          isDark(bgColor) ? "text-white" : "text-black"
        } ${eventData} flex items-center justify-between p-2 max-h-16 px-8 gap-2`}
      >
        <Logo />
        {eventData && (
          <h2 className="text-lg font-medium flex items-center gap-2 ">
            {eventData.name}
            {session?.user?.id === eventData.creatorId.toString() && (
              <Dialog open={editNameDialog} onOpenChange={setEditNameDialog}>
                <DialogTrigger>
                  <MdEdit
                    size={30}
                    onClick={() => setEditNameDialog(!editNameDialog)}
                    className={isDark(bgColor) ? "!text-white" : "!text-black"}
                    style={{
                      color: bgColor,
                      padding: "0.5rem",
                      borderRadius: "50%",
                      cursor: "pointer",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = lightenColor(
                        bgColor,
                        20
                      );
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  />
                </DialogTrigger>
                <DialogContent className="w-full max-w-sm">
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
          </h2>
        )}

        <div className="flex items-center gap-4">
          {eventData && (
            <Button
              onClick={CopyLink}
              variant="default"
              size="sm"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
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
                <DialogContent className="w-full max-w-lg">
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
                className="block px-4 py-2 bg-neutral-100 hover:bg-neutral-200 duration-300 font-medium text-sm rounded-xl cursor-pointer"
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
