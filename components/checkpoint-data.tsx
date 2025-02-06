"use client";

import { Checkpoint } from "@/app/[eventCode]/page";
import { IEvent } from "@/models/event";
import { lightenColor } from "@/utils/utils";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageSwiper } from "./image-swiper";
interface SidebarProps {
  checkpoint: Checkpoint;
  onClose: () => void;
  eventData: IEvent;
}

export default function CheckpointData({
  checkpoint,
  onClose,
  eventData,
}: SidebarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleImageClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % checkpoint.images.length
    );
  };

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2 }}
      ref={ref}
      className="absolute top-0 left-0 w-3/4 lg:w-[25%] mt-16 h-full shadow-lg z-10 m-2 rounded-2xl p-2 backdrop-blur bg-background/90 border border-background"
      style={{
        color: eventData.fontColor,
      }}
    >
      <div className="flex flex-col">
        {checkpoint.images.length > 0 ? (
          <ImageSwiper images={checkpoint.images} className="w-full h-[80%]" />
        ) : (
          <div
            className=" w-full h-40 rounded-lg relative"
            style={{
              backgroundColor: lightenColor(eventData.primaryColor, 10),
            }}
            onClick={handleImageClick}
          ></div>
        )}

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{checkpoint.name}</h2>
            <button onClick={onClose} className="icon-btn">
              <ChevronLeft size={20} />
            </button>
          </div>
          <p className="text-sm">{checkpoint.description}</p>
        </div>
      </div>
    </motion.aside>
  );
}
