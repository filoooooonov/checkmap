import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

const checkpoints = [
  { id: 1, name: "Checkpoint name" },
  { id: 2, name: "Checkpoint name" },
  { id: 3, name: "Checkpoint name" },
];

interface CheckpointListProps {
  onClose?: () => void;
}

export function CheckpointList({ onClose }: CheckpointListProps) {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <TbLayoutSidebarLeftExpandFilled
            size={20}
            className="text-neutral-500 hover:text-black duration-300 cursor-pointer"
            onClick={onClose}
          /> */}
          <h2 className="text-2xl font-bold">Your checkpoints</h2>
        </div>
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
