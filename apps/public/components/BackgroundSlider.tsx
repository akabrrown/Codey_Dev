"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/bg/media_1789666055564.jpg",
  "/images/bg/media_1789672978124.jpg",
  "/images/bg/media_1789672978147.jpg",
  "/images/bg/media_1789672978157.jpg",
];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Dark overlay to ensure text remains readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(8, 21, 35, 0.85)", // Navy dark with opacity
          zIndex: 2,
        }}
      />

      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: "opacity 2s ease-in-out",
              zIndex: 1,
            }}
          >
            <Image
              src={src}
              alt={`Background slide ${index + 1}`}
              fill
              priority={index === 0}
              style={{
                objectFit: "cover",
                transform: isActive ? "scale(1.05)" : "scale(1)",
                transition: "transform 8s linear", // Ken Burns effect
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
