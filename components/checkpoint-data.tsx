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
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % checkpoint.images.length);
  };

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      ref={ref}
      className="absolute top-0 left-0 w-3/4 lg:w-[15%] h-full shadow-lg z-10 m-2 rounded-2xl p-2"
      style={{
        backgroundColor: eventData.primaryColor,
        color: eventData.fontColor,
        border: `2px solid ${lightenColor(eventData.primaryColor, 20)}`,
      }}
    >
      <div className="flex flex-col">
        <div className="bg-neutral-200 w-full h-40 rounded-lg relative" onClick={handleImageClick}>
          {/* <Image
            src={checkpoint.images[currentImageIndex]}
            alt={`${checkpoint.name} image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          /> */}
          <ImageSwiper images={checkpoint.images} className="h-full w-full" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{checkpoint.name}</h2>
            <button
              style={{ color: eventData.fontColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = eventData.fontColor;
                e.currentTarget.style.backgroundColor = lightenColor(
                  eventData.primaryColor,
                  10
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={onClose}
              className="icon-btn"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <p>{checkpoint.description}</p>
        </div>
      </div>
    </motion.aside>
  );
}
