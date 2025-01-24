import { Checkpoint } from "@/app/[eventCode]/page";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface SidebarProps {
  checkpoint: Checkpoint;
  onClose: () => void;
}

export default function CheckpointData({ checkpoint, onClose }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 left-0 max-w-[20%] h-full bg-white p-4 shadow-lg z-10"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{checkpoint.name}</h2>
        <button onClick={onClose} className="icon-btn">
          <ChevronLeft size={20} />
        </button>
      </div>

      <p>Coordinates: {checkpoint.coords.join(", ")}</p>
    </motion.aside>
  );
}
