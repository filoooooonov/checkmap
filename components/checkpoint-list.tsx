import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkpoint } from "@/app/[eventCode]/page";
import { ChevronRight } from "lucide-react";

interface CheckpointListProps {
  onClose?: () => void;
  checkpoints: Checkpoint[];
  setShowForm: () => void;
}

export function CheckpointList({
  onClose,
  checkpoints,
  setShowForm,
}: CheckpointListProps) {
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ChevronRight size={10} className="icon-btn" onClick={onClose} />
          <h2 className="text-2xl font-bold">Your checkpoints</h2>
        </div>
        {/* <Button variant="link" className="text-blue-500">
          View all
        </Button> */}
      </div>
      <div className="flex mt-8">
        <Button onClick={setShowForm} className="flex items-center gap-2">
          <Plus />
          New checkpoint
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
