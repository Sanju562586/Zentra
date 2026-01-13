import { motion } from "framer-motion";

export default function TextReveal({ text }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}
