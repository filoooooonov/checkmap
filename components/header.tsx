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
import Link from "next/link";
import { useSession } from "next-auth/react";

export function Header({ eventData }: { eventData?: IEvent }) {
  const { data: session } = useSession();

  function CopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <header className="flex items-center justify-between p-2 max-h-16 px-8">
        <Link href="/" className="flex items-center gap-8">
          <h1 className="text-xl font-bold">Checkmap</h1>
        </Link>
        {eventData && (
          <h2 className="text-lg font-semibold">{eventData.name}</h2>
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
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create event
            </Button>
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
