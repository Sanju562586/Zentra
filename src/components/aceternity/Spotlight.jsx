"use client";
import { useEffect, useState } from "react";

export default function Spotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity"
      style={{
        background: `radial-gradient(
          600px at ${position.x}px ${position.y}px,
          rgba(56,189,248,0.15),
          transparent 80%
        )`,
      }}
    />
  );
}
