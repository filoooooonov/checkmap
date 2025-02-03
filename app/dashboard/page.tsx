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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeEvent } from "@/actions/removeEvent";
import { EllipsisVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { changeProfilePicture } from "@/actions/changeProfilePicture";
import { getUserData } from "@/actions/getUserData";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");

  const { data, refetch, isLoading } = useGetListOfEvents(userId);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
      const storedImage = localStorage.getItem("profileImgData");
      if (storedImage) {
        setBase64Image(storedImage);
      } else {
        getUserData(session.user.id).then((userData) => {
          setBase64Image(userData?.profilePicture || "");
          localStorage.setItem(
            "profileImgData",
            userData?.profilePicture || ""
          );
        });
      }
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

  const handleClick = () => {
    const fileInput = document.getElementById(
      "fileInput"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Account info */}
      {session && (
        <div className="flex items-center p-4 pb-6 border-b">
          <Avatar
            className="size-24 rounded-full cursor-pointer "
            onClick={handleClick}
          >
            <AvatarImage
              src={localStorage.getItem("profileImgData") || base64Image}
              className="size-50 rounded-full object-cover"
              alt="User"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{session.user.name}</h2>

            <p className="text-neutral-500">{session.user.email}</p>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  if (reader.result) {
                    const base64Image = reader.result.toString();
                    changeProfilePicture(base64Image, session.user.id).then(
                      () => {
                        setBase64Image(base64Image);
                      }
                    );
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      )}

      {/* Event data */}
      <div className="p-4 pt-6">
        <h2 className="text-xl font-bold">Your events</h2>
        {isLoading && (
          <div className="space-y-4 mt-4">
            <Skeleton className="w-full h-24 rounded-xl" />
            <Skeleton className="w-full h-24 rounded-xl" />
          </div>
        )}
        {data && !isLoading && (
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
                        removeEvent(event._id).then(() => refetch());
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

        {!isLoading && !data && (
          <p className="text-neutral-500 mt-40 text-center">
            You haven't created any events yet.
          </p>
        )}
      </div>
    </div>
  );
}
