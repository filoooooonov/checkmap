"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { changeEventName } from "@/actions/changeEventName";
import { MdErrorOutline } from "react-icons/md";

export default function EditEventForm({
  eventCode,
  setOpen,
  currentName,
}: {
  eventCode: string;
  setOpen: (open: boolean) => void;
  currentName: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const newName = (e.currentTarget.elements[0] as HTMLInputElement).value;

    const res = await changeEventName(newName, eventCode);
    if (res.success) {
      setSuccess(res.message);
      setError(null);
      setOpen(false);
    } else {
      setError(res.message);
      setSuccess(null);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <Input
          placeholder="New event name"
          className="max-w-[60%] mx-auto"
        ></Input>
        <Button type="submit" className="w-max mx-auto">
          Save
        </Button>

        {error && (
          <p className="text-red-500 text-center font-medium flex items-center gap-2 mx-auto">
            <MdErrorOutline />
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
