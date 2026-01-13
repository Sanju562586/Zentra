import { motion } from "framer-motion";

export default function Marquee({ items = [] }) {
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-6 bg-neutral-950">
      <motion.div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-gray-400 text-base md:text-lg font-medium"
          >
            {item}
          </span>
        ))}
      </motion.div>

      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent" />
    </div>
  );
}