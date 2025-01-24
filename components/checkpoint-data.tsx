import { Checkpoint } from "@/app/[eventCode]/page";
import { ChevronLeft } from "lucide-react";

interface SidebarProps {
  checkpoint: Checkpoint;
  onClose: () => void;
}

export default function CheckpointData({ checkpoint, onClose }: SidebarProps) {
  return (
    <aside className="absolute top-0 left-0 max-w-[30%] h-full bg-white p-2 shadow-lg z-10">
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
