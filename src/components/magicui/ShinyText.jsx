"use client";
import { motion } from "framer-motion";

export default function ShinyText({ text }) {
  return (
    <motion.span
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="inline-block bg-[linear-gradient(110deg,#fff,45%,#38bdf8,55%,#fff)]
      bg-[length:200%_100%] bg-clip-text text-transparent"
    >
      {text}
    </motion.span>
  );
}
