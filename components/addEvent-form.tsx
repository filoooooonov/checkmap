import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DateTimePicker } from "./DateTimePicker";
import { addEvent } from "@/actions/addEvent";
import { Input } from "./ui/input";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isDark, lightenColor } from "@/utils/utils";

interface AddEventFormProps {
  setOpen: (open: boolean) => void;
}

interface FormData {
  name: string;
  description: string;
  startDate: string;
  time: string;
  primaryColor: string;
  fontColor: string;
}

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 15) {
      const hour = i.toString().padStart(2, "0");
      const minute = j.toString().padStart(2, "0");
      const time = `${hour}:${minute}`;
      const isoTime = new Date(`1970-01-01T${time}:00Z`).toISOString();
      times.push({ time, isoTime });
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export default function AddEventForm({ setOpen }: AddEventFormProps) {
  const [color, setColor] = useColor("#ffffff");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    startDate: "", // will eventually hold date.toISOString()
    time: "", // "1970-01-01T02:00:00.000Z" or "HH:mm"
    primaryColor: "#ffffff", // background color
    fontColor: "#000000", // color for texts
  });
  const { data: session } = useSession();
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleColorChange = (newColor: any) => {
    setColor(newColor);
    setFormData((prevData) => ({
      ...prevData,
      primaryColor: newColor.hex,
      fontColor: isDark(newColor.hex)
        ? lightenColor(newColor.hex, 50)
        : lightenColor(newColor.hex, -50),
    }));
  };

  // Called when the user picks a date
  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, startDate: date ? date.toISOString() : "" });
  };

  // Called when the user picks a time
  const handleTimeChange = (isoTime: string) => {
    setFormData({ ...formData, time: isoTime });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!session?.user.id) {
      setResponseMessage("Please login or register");
      setLoading(false);
      return;
    }

    try {
      // Merge date & time
      const date = new Date(formData.startDate);
      // If time is an ISO string "1970-01-01T02:00:00.000Z":
      const timeDate = new Date(formData.time);
      const hours = timeDate.getUTCHours();
      const minutes = timeDate.getUTCMinutes();
      date.setHours(hours, minutes, 0, 0);

      // Or if time is "HH:mm" then parse that:
      // const [hours, minutes] = formData.time.split(":").map(Number);
      // date.setHours(hours, minutes, 0, 0);

      const eventData = {
        ...formData,
        startDate: date.toISOString(), // final merged Date
        creatorId: session.user.id,
        eventCode: Math.random().toString(36).slice(2, 10),
      };
      const newEvent = await addEvent(eventData);
      setResponseMessage("New event created successfully!");
      setOpen(false);
    } catch (error) {
      setResponseMessage("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[60%] mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <Input
          id="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          className="mx-auto"
        />
        <Input
          id="description"
          placeholder="Description"
          autoComplete="off"
          value={formData.description}
          onChange={handleChange}
          className=" mx-auto"
        />
        <span className="mt-4 font-semibold">Event start date</span>
        <div className="flex flex-col gap-2">
          <DateTimePicker onChange={handleDateChange} />
          <Select onValueChange={handleTimeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((option) => (
                <SelectItem key={option.isoTime} value={option.isoTime}>
                  {option.time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="px-4 py-2 bg-white shadow-sm border hover:bg-neutral-50 duration-300 border-neutral-200 text-sm rounded-xl flex items-center gap-2">
              <div
                style={{ backgroundColor: color.hex }}
                className="rounded-md size-4"
              ></div>
              Pick color
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              hideAlpha={true}
              color={color}
              onChange={handleColorChange}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <Button type="submit" className="w-max mx-auto" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
}
