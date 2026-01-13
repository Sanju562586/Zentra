import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import api from "../../services/api";

export default function TraceViewer() {
    const [orderId, setOrderId] = useState("ord-8821");
    const [traceData, setTraceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedSpan, setSelectedSpan] = useState(null);

    const searchTrace = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTraceData(null);
        setSelectedSpan(null);

        try {
            // Simulate network delay
            await new Promise(r => setTimeout(r, 600));
            const res = await api.get(`/admin/traces/${orderId}`);
            setTraceData(res.data);
        } catch (error) {
            console.error("Failed to fetch trace", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden h-[calc(100vh-7rem)] flex flex-col shadow-2xl">
            {/* Header / Search */}
            <div className="p-4 bg-muted/30 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium">
                    <span className="text-2xl">🔍</span>
                    Distributed Trace
                </div>

                <form onSubmit={searchTrace} className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="bg-background border border-border pl-9 pr-3 py-1.5 rounded text-sm focus:outline-none focus:border-blue-500 w-64"
                            placeholder="Enter Trace / Order ID..."
                        />
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </form>
            </div>

            <div className="flex grow overflow-hidden">
                {/* Main: Timeline Waterfall */}
                <div className="grow p-6 overflow-y-auto relative bg-background/30">
                    {!traceData && !loading && (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2 opacity-50">
                            <Search className="w-12 h-12" />
                            <p>Search for a trace to inspect</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <span className="animate-spin mr-2">⏳</span> Loading trace...
                        </div>
                    )}

                    {traceData && (
                        <div className="relative">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2 border-b border-border pb-2">
                                <span>0ms</span>
                                <span className="font-bold text-foreground text-sm">Total: {traceData.totalDuration}ms</span>
                                <span>{traceData.totalDuration}ms</span>
                            </div>

                            {/* Grid Lines */}
                            <div className="absolute inset-x-0 top-8 bottom-0 grid grid-cols-4 pointer-events-none opacity-20">
                                <div className="border-l border-foreground border-dashed h-full"></div>
                                <div className="border-l border-foreground border-dashed h-full"></div>
                                <div className="border-l border-foreground border-dashed h-full"></div>
                                <div className="border-l border-foreground border-dashed h-full"></div>
                            </div>

                            <div className="space-y-3 relative z-10 pt-4">
                                {traceData.spans.map((span, i) => (
                                    <div key={i} className="group grid grid-cols-[140px_1fr] gap-4 items-center">
                                        <div className={`text-xs font-medium truncate text-right pr-2 ${selectedSpan === span ? "text-foreground" : "text-muted-foreground"}`}>
                                            {span.service}
                                        </div>

                                        <div className="relative h-9 w-full bg-muted/20 rounded overflow-hidden">
                                            <motion.button
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{
                                                    width: `${(span.duration / traceData.totalDuration) * 100}%`,
                                                    opacity: 1,
                                                    x: 0
                                                }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                                layoutId={`span-${i}`}
                                                onClick={() => setSelectedSpan(span)}
                                                className={`absolute top-0.5 bottom-0.5 rounded text-left px-2 flex items-center text-[10px] font-bold text-white shadow-lg border border-white/10 hover:brightness-110 transition-all ${span.status === "SUCCESS" ? "bg-blue-600" : "bg-red-600"
                                                    }`}
                                                style={{ left: `${(span.start / traceData.totalDuration) * 100}%` }}
                                            >
                                                {span.duration}ms
                                            </motion.button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Span Details Panel */}
                <AnimatePresence>
                    {selectedSpan && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-80 bg-card border-l border-border p-6 shadow-2xl z-20"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-lg font-bold">{selectedSpan.service}</h3>
                                <button onClick={() => setSelectedSpan(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h4 className="text-xs uppercase text-muted-foreground tracking-wider">Status</h4>
                                    <div className={`flex items-center gap-2 text-sm font-medium ${selectedSpan.status === "SUCCESS" ? "text-green-500" : "text-red-500"}`}>
                                        {selectedSpan.status === "SUCCESS" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                        {selectedSpan.status}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-xs uppercase text-muted-foreground tracking-wider">Timing</h4>
                                    <div className="flex items-center gap-2 text-foreground text-sm">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span>Start: {selectedSpan.start}ms</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground text-sm">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span>Duration: {selectedSpan.duration}ms</span>
                                    </div>
                                </div>

                                <div className="p-3 bg-muted/30 rounded border border-border font-mono text-xs text-muted-foreground">
                                    <div className="text-muted-foreground mb-1 opacity-70">// Metadata</div>
                                    <p>span_id: <span className="text-blue-500 dark:text-blue-400">sp-{Math.floor(Math.random() * 1000)}</span></p>
                                    <p>trace_id: <span className="text-purple-500 dark:text-purple-400">{orderId}</span></p>
                                    <p>host: <span className="text-orange-500 dark:text-orange-400">use-east-1b</span></p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
