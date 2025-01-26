"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function AddEventForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  // Update form data state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

  const generatedEventCode = Math.random().toString(36).slice(2).slice(0, 6);
    try {
      const response = await fetch("/api/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          eventCode: generatedEventCode,
          creatorId: session?.user?.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResponseMessage(data.error || "Failed to create event");
      } else {
        setResponseMessage("New event created successfuly!");
        setFormData({
          name: "",
          description: "",
        }); // Clear the form
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
        <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          <Input
            id="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            className="max-w-[60%] mx-auto"
          ></Input>
          <Input
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="max-w-[60%] mx-auto"
          ></Input>
          <Button  type="submit" className="w-max mx-auto" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    );
  }