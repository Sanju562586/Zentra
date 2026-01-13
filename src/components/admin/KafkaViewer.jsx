import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, RefreshCw, Copy, Check, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export default function KafkaViewer() {
  const [selectedTopic, setSelectedTopic] = useState("order-events");
  const [copied, setCopied] = useState(null);

  // Fetch Topics
  const { data: topics = [] } = useQuery({
    queryKey: ['kafka-topics'],
    queryFn: () => api.get('/admin/kafka/topics').then(res => res.data),
  });

  // Fetch Messages for Topic
  const { data: messages = [], refetch, isRefetching } = useQuery({
    queryKey: ['kafka-messages', selectedTopic],
    queryFn: () => api.get(`/admin/kafka/messages?topic=${selectedTopic}`).then(res => res.data),
    refetchInterval: 5000,
  });

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-[hsl(222,47%,11%)] via-[hsl(199,89%,48%)] to-[hsl(350,89%,60%)] shrink-0 gap-3">
        <div className="flex items-center gap-2 font-medium text-white">
          <Terminal className="w-5 h-5" />
          <span className="text-lg font-bold tracking-wide">Kafka Stream</span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Topic Selector */}
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="appearance-none bg-white/10 border border-white/20 rounded-full px-4 py-1.5 pr-8 text-sm text-white focus:outline-none focus:bg-white/20 backdrop-blur-md"
            >
              {[...topics].map(t => <option key={t} value={t} className="text-black">{t}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 text-white/70 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => refetch()}
            className={`p-1.5 rounded-full hover:bg-white/20 transition-colors ${isRefetching ? "animate-spin text-white" : "text-white/80"}`}
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-background/50 border-b border-border py-1 px-4 text-[10px] text-muted-foreground flex justify-between uppercase tracking-wider">
        <span>Offset Lag: <span className="text-foreground">0</span></span>
        <span>Partition: <span className="text-foreground">0</span></span>
        <span>Replicas: <span className="text-foreground">3</span></span>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm bg-muted/5">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.offset}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-lg border border-border bg-card overflow-hidden shadow-sm"
            >
              {/* Message Header */}
              <div className="flex justify-between items-center bg-muted/20 px-3 py-2 border-b border-border">
                <div className="flex gap-3 text-xs">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Offset: {msg.offset}</span>
                  <span className="text-muted-foreground">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(msg.value, null, 2), msg.offset)}
                  className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                >
                  {copied === msg.offset ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* JSON Content */}
              <div className="p-3 overflow-x-auto">
                <pre className="text-xs text-foreground/80 leading-relaxed">
                  {JSON.stringify(msg.value, null, 2)}
                </pre>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20 flex flex-col items-center gap-2">
            <span className="text-2xl">💤</span>
            <span>No messages in this topic</span>
          </div>
        )}
      </div>
    </div>
  );
}