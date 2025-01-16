import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const checkpoints = [
  { id: 1, name: "Checkpoint name" },
  { id: 2, name: "Checkpoint name" },
  { id: 3, name: "Checkpoint name" },
];

export function CheckpointList() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your checkpoints</h3>
        <Button variant="link" className="text-blue-500">
          View all
        </Button>
      </div>
      <div className="space-y-2">
        {checkpoints.map((checkpoint) => (
          <Button
            key={checkpoint.id}
            variant="ghost"
            className="w-full justify-start gap-2"
          >
            <MapPin className="h-4 w-4" />
            {checkpoint.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
