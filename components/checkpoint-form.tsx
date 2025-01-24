"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";

interface CheckpointFormProps {
  onBack: () => void;
}

export function CheckpointForm({ onBack }: CheckpointFormProps) {
  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="icon-btn">
          <ChevronRight size={20} />
        </button>
        <h2 className="text-2xl font-bold">New checkpoint</h2>
      </div>
      <div className="space-y-2">
        <Input id="name" placeholder="Checkpoint name*" />
      </div>
      <div className="space-y-2">
        <Textarea
          id="description"
          placeholder="Description"
          className="min-h-[100px]"
        />
      </div>
      <Button className="w-full">Save checkpoint</Button>
    </div>
  );
}
