"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import img from "@/public/placeholder-user.png";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MapView from "../[eventCode]/MapView";
import { useGetListOfEvents } from "@/utils/hooks/useGetListOfEvents";
import IEvent from "@/models/event"
export default function Page() {
  // TODO: get user from session, redirect if the user is unauthenticated

  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");
  const { data } = useGetListOfEvents(userId);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);
  if (status !== "authenticated" && status !== "loading") {
    redirect("/");
  }

  if (!session?.user?.id) {
    return <div className="text-center mt-80">Loading...</div>;
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
        {data ? (
          <ul>
            {data.map((event: any) => (
              <li key={event._id}>
                <Link href={`/${event.eventCode}`}>{event.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500 mt-40 text-center">
            You haven't created any events yet.
          </p>
        )}
      </div>
    </div>
  );
}
