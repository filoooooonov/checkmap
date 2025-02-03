"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MapLoaderScreen = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const baseDotSize = 6;
  const dotColor = "#E5E7EB"; // Tailwind's gray-200
  const gap = 36; // Space between dots

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const columns = Math.floor(dimensions.width / gap);
  const rows = Math.floor(dimensions.height / gap);

  const dots = Array.from({ length: rows * columns }).map((_, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    return { x: col * gap, y: row * gap, index };
  });

  return (
    <div className="fixed inset-0 bg-white">
      {dots.map(({ x, y, index }) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            backgroundColor: dotColor,
          }}
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.75, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            delay: (index % 7) * 0.2, // Create a more complex wave effect
            ease: "easeInOut",
          }}
        >
          <div style={{ width: baseDotSize, height: baseDotSize }} />
        </motion.div>
      ))}
    </div>
  );
};

export default MapLoaderScreen;
