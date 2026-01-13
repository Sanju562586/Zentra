import { useState, useEffect } from "react";
import { AlertTriangle, Power, Zap, Radio, RefreshCw, ShieldAlert, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardCard from "./DashboardCard";

export default function ChaosTesting() {
    const [activeFailures, setActiveFailures] = useState([]);
    const [systemHealth, setSystemHealth] = useState({
        circuitBreaker: "CLOSED",
        successRate: 99.9,
        fallback: "None",
        recoveryETA: 0
    });

    const scenarios = [
        { id: "payment_kill", name: "Kill Payment Service", description: "Simulate 503 Service Unavailable", icon: Power },
        { id: "latency", name: "Slow Database", description: "Inject 2s latency to queries", icon: Zap },
        { id: "partition", name: "Network Partition", description: "Drop 30% of packets", icon: Radio },
    ];

    const toggleFailure = (id) => {
        setActiveFailures(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const restoreAll = () => {
        setActiveFailures([]);
    };

    // Simulate Impact Logic
    useEffect(() => {
        if (activeFailures.length === 0) {
            setSystemHealth({
                circuitBreaker: "CLOSED",
                successRate: 99.9,
                fallback: "None",
                recoveryETA: 0
            });
            return;
        }

        const isPaymentDown = activeFailures.includes("payment_kill");
        const isSlow = activeFailures.includes("latency");
        const isPartition = activeFailures.includes("partition");

        setSystemHealth({
            circuitBreaker: isPaymentDown ? "OPEN" : "CLOSED",
            successRate: isPaymentDown ? 85.0 : isPartition ? 92.5 : isSlow ? 98.2 : 99.9,
            fallback: isPaymentDown ? "Cached responses" : "None",
            recoveryETA: (isPaymentDown ? 45 : 0) + (isSlow ? 15 : 0) + (isPartition ? 30 : 0)
        });

    }, [activeFailures]);


    return (
        <DashboardCard
            title="Chaos Engineering"
            description="Simulate production failures to test resilience"
            icon={AlertTriangle}
        >

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 grow overflow-y-auto">
                {/* Left: Controls */}
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Test System Resilience
                    </h3>

                    <div className="space-y-3">
                        {scenarios.map((scenario) => {
                            const isActive = activeFailures.includes(scenario.id);
                            const Icon = scenario.icon;

                            return (
                                <button
                                    key={scenario.id}
                                    onClick={() => toggleFailure(scenario.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left group",
                                        isActive
                                            ? "bg-red-500 text-white border-red-500"
                                            : "bg-muted/40 border-border hover:bg-muted"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn("p-2 rounded-lg", isActive ? "bg-white/20 text-white" : "bg-card text-muted-foreground")}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className={cn("block font-bold", isActive ? "text-white" : "text-foreground")}>{scenario.name}</span>
                                            <span className={cn("text-xs", isActive ? "text-white/80" : "text-muted-foreground")}>{scenario.description}</span>
                                        </div>
                                    </div>

                                    <div className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                                        {isActive ? "ACTIVE" : "INACTIVE"}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Right: Impact Dashboard */}
                <div className="bg-muted/10 rounded-xl border border-border p-6 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2 relative z-10">
                        <ShieldAlert className="w-4 h-4" /> Current Impact
                    </h3>

                    <div className="space-y-6 relative z-10">
                        {/* Circuit Breaker Status */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Circuit Breaker</span>
                                <span className={cn("font-bold font-mono", systemHealth.circuitBreaker === "OPEN" ? "text-red-500" : "text-green-500")}>
                                    {systemHealth.circuitBreaker}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className={cn("h-full transition-all duration-500", systemHealth.circuitBreaker === "OPEN" ? "w-full bg-red-500" : "w-0 bg-green-500")} />
                            </div>
                        </div>

                        {/* Success Rate */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Success Rate</span>
                                <span className={cn("font-bold font-mono", systemHealth.successRate < 99 ? "text-yellow-500" : "text-green-500")}>
                                    {systemHealth.successRate}% {systemHealth.successRate < 99.9 && <span className="text-red-500 text-xs ml-1">(↓{Math.abs(99.9 - systemHealth.successRate).toFixed(1)}%)</span>}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full transition-all duration-500", systemHealth.successRate < 90 ? "bg-red-500" : systemHealth.successRate < 99 ? "bg-yellow-500" : "bg-green-500")}
                                    style={{ width: `${systemHealth.successRate}%` }}
                                />
                            </div>
                        </div>

                        {/* Fallback & Recovery */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border">
                            <div>
                                <span className="text-xs text-muted-foreground block mb-1">Active Fallback</span>
                                <span className="text-sm text-foreground font-mono border-b border-dashed border-border pb-0.5">{systemHealth.fallback}</span>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground block mb-1">Recovery ETA</span>
                                <span className="text-sm text-foreground font-mono">{systemHealth.recoveryETA} seconds</span>
                            </div>
                        </div>

                        {/* Restore Button */}
                        <button
                            onClick={restoreAll}
                            disabled={activeFailures.length === 0}
                            className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Restore All Services
                        </button>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
