import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Spotlight from "../aceternity/Spotlight";
import ShinyText from "../magicui/ShinyText";
import Magnetic from "../animations/Magnetic";
import { BackgroundBeams } from "../ui/background-beams";
import { SparklesCore } from "../ui/sparkles";

export default function SpotlightHero() {
  return (
    <section className="relative min-h-screen bg-background text-foreground flex items-center justify-center overflow-hidden">
      {/* Spotlight glow - Adjusted hue for BMW Blue */}
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen fill-[hsl(212,100%,45%)]" />

      {/* Background beams */}
      <BackgroundBeams className="opacity-30" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center space-y-8 px-6"
      >
        {/* Heading + sparkles */}
        <div className="relative">
          {/* Sparkles overlay (scoped properly) */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={80}
              className="w-full h-full"
              particleColor="hsl(212 100% 45%)" // BMW Blue sparkles
            />
          </div>

          <h1 className="relative z-10 text-5xl md:text-8xl font-black tracking-tight leading-none mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(222,47%,11%)] via-[hsl(199,89%,48%)] to-[hsl(350,89%,60%)]">
              Zentra
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground tracking-wide">
            Distributed E-Commerce <span className="font-semibold text-foreground">Architecture</span>
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Experience the power of <span className="text-[hsl(199,89%,48%)] font-medium">Event-Driven Microservices</span> tailored for high-scale performance.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center pt-8 w-full max-w-sm mx-auto md:max-w-none">
          <Magnetic>
            <Link to="/store" className="w-full md:w-auto">
              <Button
                size="lg"
                className="w-full px-8 h-12 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all bg-gradient-to-r from-[hsl(222,47%,11%)] to-[hsl(199,89%,48%)] text-white border-0"
              >
                Try the Store
              </Button>
            </Link>
          </Magnetic>

          <Magnetic>
            <Link to="/admin" className="w-full md:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full px-8 h-12 text-lg rounded-full border-2 border-[hsl(222,47%,11%)]/10 hover:bg-[hsl(222,47%,11%)]/5 hover:border-[hsl(222,47%,11%)]/30 text-foreground"
              >
                View Admin Dashboard
              </Button>
            </Link>
          </Magnetic>
        </div>

        {/* ASCII Stats & Features Section */}
        <div className="grid md:grid-cols-2 gap-8 text-left mt-16 max-w-4xl mx-auto p-6 rounded-2xl bg-white border border-border shadow-md dark:bg-black/20 dark:border-white/10">
          {/* Features */}
          <div className="space-y-3 font-mono text-sm md:text-base">
            <h3 className="text-[hsl(199,89%,48%)] font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">⚡</span> Features Showcase
            </h3>
            <div className="text-zinc-800 dark:text-muted-foreground pl-2 border-l-2 border-[hsl(199,89%,48%)]/20">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(199,89%,48%)]"></span> Event-Driven Architecture</div>
              <div className="flex items-center gap-2 mt-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(199,89%,48%)]"></span> Real-time Monitoring</div>
              <div className="flex items-center gap-2 mt-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(199,89%,48%)]"></span> Distributed Tracing</div>
              <div className="flex items-center gap-2 mt-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(350,89%,60%)]"></span> Chaos Testing</div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3 font-mono text-sm md:text-base">
            <h3 className="text-[hsl(222,47%,11%)] dark:text-white font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">📊</span> Live Stats
            </h3>
            <div className="text-zinc-800 dark:text-muted-foreground pl-2 border-l-2 border-[hsl(222,47%,11%)]/20 dark:border-white/20">
              <div className="flex justify-between items-center bg-zinc-50 dark:bg-white/5 p-2 rounded mb-1 border border-zinc-100 dark:border-none">
                <span>Orders Today</span>
                <span className="font-bold text-black dark:text-foreground">1,234</span>
              </div>
              <div className="flex justify-between items-center bg-zinc-50 dark:bg-white/5 p-2 rounded mb-1 border border-zinc-100 dark:border-none">
                <span>Success Rate</span>
                <span className="font-bold text-green-600">99.5%</span>
              </div>
              <div className="flex justify-between items-center bg-zinc-50 dark:bg-white/5 p-2 rounded border border-zinc-100 dark:border-none">
                <span>Avg Response</span>
                <span className="font-bold text-[hsl(199,89%,48%)]">120ms</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}