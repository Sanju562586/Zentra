import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react";
import api from "../../services/api";

export default function TestRunner({ tests }) {
  const [runningTest, setRunningTest] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [activeSteps, setActiveSteps] = useState([]);

  // Loop through all tests sequentially
  const runAllTests = async () => {
    for (let i = 0; i < tests.length; i++) {
      await runTest(i);
      await new Promise(r => setTimeout(r, 1000)); // Pause between tests
    }
  };

  const runTest = async (index) => {
    if (runningTest !== null) return;

    setRunningTest(index);
    setActiveSteps([]); // Clear previous steps

    // Simulate API Call
    try {
      const res = await api.post('/admin/tests/run', { scenario: tests[index].name });
      const { steps } = res.data;

      // Animate steps one by one
      for (let i = 0; i < steps.length; i++) {
        await new Promise(r => setTimeout(r, 600)); // Delay for effect
        setActiveSteps(prev => [...prev, steps[i]]);
      }

      const totalDuration = steps.reduce((acc, s) => acc + s.duration, 0);

      setTestResults(prev => ({
        ...prev,
        [index]: { status: "PASS", duration: totalDuration }
      }));

    } catch (e) {
      setTestResults(prev => ({
        ...prev,
        [index]: { status: "FAIL", duration: 0 }
      }));
    } finally {
      setRunningTest(null);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 bg-muted/30 border-b border-border">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="text-2xl">🧪</span> Test Scenarios
        </h2>
        <button
          onClick={runAllTests}
          disabled={runningTest !== null}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Play className="w-3 h-3 fill-current" /> Run All Tests
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 grow overflow-y-auto">
        {/* Left: Test List */}
        <div className="space-y-4">
          {tests.map((test, index) => {
            const result = testResults[index];
            const isRunning = runningTest === index;

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${isRunning ? "bg-blue-500/10 border-blue-500/50" :
                  result?.status === "PASS" ? "bg-green-500/10 border-green-500/30" :
                    "bg-muted/40 border-border"
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-foreground">{test.name}</h3>
                    <p className="text-sm text-muted-foreground">{test.description}</p>
                  </div>
                  {isRunning ? (
                    <span className="text-blue-500 dark:text-blue-400 animate-pulse text-xs font-bold uppercase">Running...</span>
                  ) : result ? (
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${result.status === "PASS" ? "bg-green-500/20 text-green-600 dark:text-green-400" : "bg-red-500/20 text-red-600 dark:text-red-400"}`}>
                        {result.status}
                      </span>
                      <div className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" /> {result.duration}ms
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => runTest(index)}
                      className="p-2 bg-muted hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Execution Details */}
        <div className="bg-muted/10 rounded-lg border border-border p-6 relative">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Live Execution Log</h3>

          <div className="space-y-4 relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border z-0"></div>

            {activeSteps.length === 0 && !runningTest && (
              <p className="text-muted-foreground italic text-sm text-center mt-20">Select a test to see execution steps</p>
            )}

            {activeSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-card border-green-500 text-green-500`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 bg-card p-3 rounded border border-border flex justify-between items-center shadow-sm">
                  <span className="text-foreground text-sm font-medium">{step.name}</span>
                  <span className="text-muted-foreground text-xs font-mono">{step.duration}ms</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}