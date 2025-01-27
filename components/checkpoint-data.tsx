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
      className="absolute bg-white top-0 left-0 h-full shadow-lg z-10"
    >
      <div className="flex flex-col">
        <div className="bg-neutral-200 w-full h-40"></div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{checkpoint.name}</h2>
            <button onClick={onClose} className="icon-btn">
              <ChevronLeft size={20} />
            </button>
          </div>
          <p>{checkpoint.description}</p>
        </div>
      </div>
    </motion.aside>
  );
}
