import { Checkpoint } from "@/app/page";

interface SidebarProps {
  checkpoint: Checkpoint;
  onClose: () => void;
}

export default function CheckpointData({ checkpoint, onClose }: SidebarProps) {
  return (
    <aside className="absolute top-0 left-0 w-1/4 h-full bg-white p-4 shadow-lg z-10">
      <h2 className="text-xl font-bold">{checkpoint.name}</h2>
      <p>Coordinates: {checkpoint.coords.join(", ")}</p>
      <button onClick={onClose}>Close</button>
    </aside>
  );
}
