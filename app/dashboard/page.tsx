"use client";

import Image from "next/image";
import React from "react";
import img from "@/public/placeholder-user.png";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MapView from "../[eventCode]/MapView";

export default function Page() {
  // TODO: get user from session, redirect if the user is unauthenticated

  const { data: session, status } = useSession();

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
        <p className="text-neutral-500 mt-40 text-center">
          No events here yet...
        </p>
      </div>
    </div>
  );
}
