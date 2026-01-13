import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, RefreshCw } from "lucide-react";

const MAX_LOGS = 100;
const TOP_THRESHOLD = 8; // px tolerance for "at top"

export default function LogsViewer({ logs, fullHeight = false }) {
  const containerRef = useRef(null);
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const logQueue = useRef([]);
  const [autoScroll, setAutoScroll] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("All");
  const [filter, setFilter] = useState("ALL");

  const services = ["All", "ORDER", "PAYMENT", "INVENTORY", "AUTH", "NOTIFICATION", "SYSTEM"];

  // Queue new logs when they arrive
  useEffect(() => {
    // Identify logs we haven't seen yet (by ID)
    const knownIds = new Set(displayedLogs.map(l => l.id));
    const queuedIds = new Set(logQueue.current.map(l => l.id));

    const newItems = logs.filter(l => !knownIds.has(l.id) && !queuedIds.has(l.id));

    if (newItems.length > 0) {
      logQueue.current = [...logQueue.current, ...newItems];
    }
  }, [logs, displayedLogs]);

  // Process queue periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (logQueue.current.length > 0) {
        const nextLog = logQueue.current.shift();

        setDisplayedLogs(prev => {
          const updated = [nextLog, ...prev];
          return updated.slice(0, MAX_LOGS);
        });
      }
    }, 1500); // Add one log every 150ms

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logic (keep view at top for latest)
  useEffect(() => {
    if (!containerRef.current) return;
    if (autoScroll) {
      containerRef.current.scrollTop = 0;
    }
  }, [displayedLogs, autoScroll]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop } = containerRef.current;
    if (scrollTop > TOP_THRESHOLD && autoScroll) setAutoScroll(false);
    if (scrollTop <= TOP_THRESHOLD && !autoScroll) setAutoScroll(true);
  };

  // Filter Logic
  const filteredLogs = displayedLogs.filter(log => {
    const matchesService = selectedService === "All" || (log.service || "SYSTEM") === selectedService;
    const matchesLevel = filter === "ALL" || log.type === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.service || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && matchesSearch && matchesLevel;
  });

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden flex flex-col ${fullHeight ? "h-[calc(100vh-8rem)]" : "h-auto"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-[hsl(222,47%,11%)] via-[hsl(199,89%,48%)] to-[hsl(350,89%,60%)] shrink-0 gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>📋</span> System Logs
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 backdrop-blur-md"
            />
          </div>

          {/* Level Filter */}
          <div className="flex bg-black/20 p-1 rounded-full backdrop-blur-sm">
            {["ALL", "INFO", "WARN", "ERROR"].map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${filter === level
                  ? "bg-white text-[hsl(222,47%,11%)] shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                {level}
              </button>
            ))}
          </div>

          <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors" title="Reload">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`overflow-y-auto space-y-1 p-2 text-sm grow bg-card ${!fullHeight && "max-h-80"}`}
      >
        {filteredLogs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-start gap-3 p-1.5 rounded border-l-2 ${log.type === "ERROR" ? "border-red-500 bg-red-500/10" :
              log.type === "WARN" ? "border-yellow-500 bg-yellow-500/10" :
                log.type === "SUCCESS" ? "border-green-500 bg-green-500/10" :
                  "border-blue-500 bg-blue-500/10"
              }`}
          >
            <span className="text-muted-foreground text-xs shrink-0 w-20 font-mono pt-0.5">
              {log.time}
            </span>
            <div className="flex gap-2 items-center">
              <span className={`text-[10px] uppercase tracking-wider font-bold shrink-0 w-24 ${log.type === "ERROR" ? "text-red-500 dark:text-red-400" :
                log.type === "WARN" ? "text-yellow-600 dark:text-yellow-400" :
                  log.type === "SUCCESS" ? "text-green-600 dark:text-green-400" :
                    "text-blue-600 dark:text-blue-400"
                }`}>
                [{log.service || "SYSTEM"}]
              </span>
              <span className={`font-mono text-xs ${log.type === "ERROR" ? "text-red-600 dark:text-red-200" : "text-foreground"}`}>
                {log.type === "INFO" && "ℹ️ "}
                {log.type === "ERROR" && "❌ "}
                {log.type === "WARN" && "⚠️ "}
                {log.type === "SUCCESS" && "✅ "}
                {log.message}
              </span>
            </div>
          </motion.div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
            <span className="text-2xl">🔍</span>
            <p>No logs match your filter</p>
          </div>
        )}
      </div>

      {/* Footer Stat */}
      <div className="bg-muted/50 border-t border-border text-[10px] text-muted-foreground px-3 py-1 flex justify-between">
        <span>Buffer: {logQueue.current.length}</span>
        <span>Showing: {filteredLogs.length}</span>
      </div>
    </div>
  );
}
