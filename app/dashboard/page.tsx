"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import img from "@/public/placeholder-user.png";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useGetListOfEvents } from "@/utils/hooks/useGetListOfEvents";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeEvent } from "@/actions/removeEvent";
import { EllipsisVertical, Loader2 } from "lucide-react";
export default function Page() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");
  const { data, refetch, isLoading, isPending } = useGetListOfEvents(userId);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  if (status !== "authenticated" && status !== "loading") {
    redirect("/");
  }

  if (!session?.user?.id) {
    return (
      <div className="text-center mt-80 flex items-center gap-2 justify-center ">
        <Loader2 className="size-6 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Account info */}
      {session && (
        <div className="flex items-center p-4 pb-6 border-b">
          <Image
            src={session.user.image || img}
            alt="User"
            className="size-24 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{session.user.name}</h2>
            <p className="text-neutral-500">{session.user.email}</p>
          </div>
        </div>
      )}

      {/* Event data */}
      <div className="p-4 pt-6">
        <h2 className="text-xl font-bold">Your events</h2>
        {data && !isLoading && !isPending && (
          <ul className="space-y-4 mt-4">
            {data.map((event: any) => (
              <li
                key={event._id}
                className="bg-neutral-50 cursor-pointer duration-300 hover:bg-neutral-100 rounded-xl p-4 relative flex justify-between items-center"
              >
                <Link
                  href={`/${event.eventCode}`}
                  className="flex flex-col w-full gap-2"
                >
                  <h3 className="font-bold"> {event.name}</h3>

                  {event.startDate && (
                    <span className="text-sm text-medium text-neutral-500">
                      {format(new Date(event.startDate), "E, MMM d, HH:mm")}
                    </span>
                  )}

                  <p className="text-sm font-medium text-neutral-500">
                    {event.description}
                  </p>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="rounded-full hover:bg-neutral-200 duration-200 p-2"
                    asChild
                  >
                    <EllipsisVertical size={35} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-25">
                    <DropdownMenuItem
                      className="flex justify-center items-center py-1"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeEvent(event._id);
                      }}
                    >
                      <span className="text-red-500">Delete event</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && !isPending && !data && (
          <p className="text-neutral-500 mt-40 text-center">
            You haven't created any events yet.
          </p>
        )}
      </div>
    </div>
  );
}
