import { motion } from "framer-motion";

const features = [
  {
    title: "Event-Driven Architecture",
    desc: "Built on asynchronous messaging for high scalability and resilience.",
    glow: "from-blue-500/30 to-cyan-500/10",
  },
  {
    title: "Real-Time Monitoring",
    desc: "Track orders, latency, and system health in real time.",
    glow: "from-purple-500/30 to-pink-500/10",
  },
  {
    title: "Distributed Tracing",
    desc: "Visualize request flow across microservices.",
    glow: "from-emerald-500/30 to-teal-500/10",
  },
  {
    title: "Chaos Testing",
    desc: "Test system resilience by simulating failures.",
    glow: "from-orange-500/30 to-red-500/10",
  },
];

export default function FeaturesBento() {
  return (
    <section className="relative py-28 px-6 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Built for Modern Distributed Systems
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Zentra is not just an e-commerce app — it’s a production-grade
          system designed for scale, reliability, and observability.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 overflow-hidden"
          >
            {/* Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${f.glow} opacity-60`}
            />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-gray-300">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
