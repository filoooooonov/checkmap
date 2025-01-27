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
export function Header({ eventData }: { eventData?: IEvent }) {
  const { data: session } = useSession();
  const [editNameDialog, setEditNameDialog] = useState(false);
  const [createEvenetDialog, setCreateEvenetDialog] = useState(false);
  function CopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <header className="flex items-center justify-between p-2 max-h-16 px-8 gap-2">
        <Link href="/" className="flex items-center gap-8">
          <h1 className="text-xl font-bold">Checkmap</h1>
        </Link>
        {eventData && (
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {eventData.name}
            {session?.user?.id === eventData.creatorId.toString() && (
              <Dialog open={editNameDialog} onOpenChange={setEditNameDialog}>
                <DialogTrigger>
                  <MdEdit
                    size={30}
                    onClick={() => setEditNameDialog(!editNameDialog)}
                    className="text-neutral-500 p-2 rounded-full cursor-pointer duration-300 hover:bg-neutral-100"
                  />
                </DialogTrigger>
                <DialogContent>
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
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create new event</DialogTitle>
                  </DialogHeader>
                  <AddEventForm />
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
                className="block px-4 py-2 bg-neutral-100 hover:bg-neutral-200 duration-300 font-medium text-sm rounded-md cursor-pointer"
              >
                Login
              </Link>
              <Link href="\register">
                <Button className="block px-4 py-2 duration-300 font-medium text-sm rounded-md cursor-pointer">
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
