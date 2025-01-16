"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";

interface CheckpointFormProps {
  onBack: () => void;
}

export function CheckpointForm({ onBack }: CheckpointFormProps) {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">New checkpoint</h2>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Checkpoint name*</Label>
        <Input id="name" placeholder="Enter checkpoint name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter checkpoint description"
          className="min-h-[100px]"
        />
      </div>
      <Button className="w-full">Save checkpoint</Button>
    </div>
  );
}
