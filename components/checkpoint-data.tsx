import { Checkpoint } from "@/app/page";
import { ChevronLeft } from "lucide-react";

interface SidebarProps {
  checkpoint: Checkpoint;
  onClose: () => void;
}

export default function CheckpointData({ checkpoint, onClose }: SidebarProps) {
  return (
    <aside className="absolute top-0 left-0 w-1/4 h-full bg-white p-4 shadow-lg z-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{checkpoint.name}</h2>
        <button onClick={onClose} className="icon-btn">
          <ChevronLeft size={20} />
        </button>
      </div>

      <p>Coordinates: {checkpoint.coords.join(", ")}</p>
    </aside>
  );
}
