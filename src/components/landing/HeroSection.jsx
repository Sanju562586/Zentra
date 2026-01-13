import { motion } from "framer-motion";
import { Button } from "../ui/button";
import TextReveal from "../animations/TextReveal";
import Magnetic from "../animations/Magnetic";
import Spotlight from "../aceternity/Spotlight";
import ShinyText from "../magicui/ShinyText";



export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <Spotlight />

      {/* Aceternity-style glow blobs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 right-24 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[120px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center space-y-6 px-6"
      >
        {/* Magic UI–style shiny heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold">
          <ShinyText text="Zentra" />
          <br />
          Distributed Commerce, Reimagined
        </h1>


        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          A production-grade e-commerce system with real-time monitoring,
          observability, and event-driven architecture.
        </p>

        <Magnetic>
          <Button size="lg" className="px-8">
            Try the Store
          </Button>
        </Magnetic>

        <Magnetic>
          <Button
            size="lg"
            variant="outline"
            className="px-8 border-white/20 text-white hover:bg-white/10"
          >
            View Admin Dashboard
          </Button>
        </Magnetic>


      </motion.div>
    </section>
  );
}