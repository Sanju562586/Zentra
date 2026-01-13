import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ScrollReveal from "../magicui/ScrollReveal";

import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10" />
);

const features = [
  {
    title: "Event-Driven",
    description: "Built on asynchronous messaging for high scalability.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "Real-Time Monitoring",
    description: "Track orders and latency in real time.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "Distributed Tracing",
    description: "Visualize request flow across microservices.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "Chaos Engineering",
    description: "Test resilience by simulating failures.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-400" />,
  },
];

export default function BentoFeatures() {
  return (
    <section className="py-20 w-full">
      <div className="container">
        <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
          {features.map((item, i) => (
            <ScrollReveal key={i}>
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            </ScrollReveal>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                BENTO GRID                                   */
/* -------------------------------------------------------------------------- */

const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              BENTO GRID ITEM                                */
/* -------------------------------------------------------------------------- */

const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative rounded-xl overflow-hidden p-4 flex flex-col justify-between",
        "bg-neutral-900 border border-white/10",
        "hover:border-white/20",
        className
      )}
    >
      {/* Subtle glow (fixed: removed broken group-hover dependency) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-300">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 blur-[80px]" />
      </div>

      {header}

      <div className="relative z-10 mt-4">
        {icon}
        <h3 className="mt-2 text-lg font-semibold text-neutral-200">
          {title}
        </h3>
        <p className="mt-1 text-sm text-neutral-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
