"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const MapLoaderScreen = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const baseDotSize = 3;
  const dotColor = "#697760"; // Tailwind's gray-200
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

  const dots = useMemo(() => {
    return Array.from({ length: rows * columns }).map((_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      return {
        x: col * gap,
        y: row * gap,
        index,
        delay: Math.random() * 2, // Random delay between 0 and 2 seconds
        duration: 4 + Math.random(), // Random duration between 1.5 and 2.5 seconds
        maxScale: 1.5 + Math.random() * 0.5, // Random max scale between 1.5 and 2
      };
    });
  }, [rows, columns]);

  return (
    <div className="fixed inset-0 bg-background">
      {dots.map(({ x, y, index, delay, duration, maxScale }) => (
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
            scale: [1, maxScale, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: duration,
            delay: delay,
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
