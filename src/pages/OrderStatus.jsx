import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Check, Clock, Package, Truck, ArrowRight } from "lucide-react";
import api from "../services/api";
import { TracingBeam } from "../components/ui/tracing-beam";

const STATUS_ICONS = {
    PLACED: Clock,
    PROCESSING: Package,
    SHIPPED: Truck,
    DELIVERED: Check,
};

export default function OrderStatus() {
    const { id } = useParams();

    const { data: order, isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: () => api.get(`/orders/${id}`).then((res) => res.data),
    });

    if (isLoading) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-3xl mx-auto pt-20">
                <h1 className="text-3xl font-bold mb-2">Order Status</h1>
                <p className="text-neutral-500 mb-12">Tracking ID: {id}</p>

                <TracingBeam className="px-6">
                    <div className="relative space-y-12 pl-12">
                        {order.timeline.map((event, index) => {
                            const Icon = STATUS_ICONS[event.status] || Clock;
                            const isCompleted = event.completed;

                            return (
                                <div key={index} className="relative">
                                    {/* Timeline Dot */}
                                    <div
                                        className={`absolute -left-[53px] top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center z-20 bg-black ${isCompleted ? "border-blue-500" : "border-neutral-700"
                                            }`}
                                    >
                                        {isCompleted && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        )}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        className={`p-6 rounded-xl border ${isCompleted
                                                ? "bg-blue-500/5 border-blue-500/20"
                                                : "bg-neutral-900 border-white/5"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 mb-2">
                                            <div
                                                className={`p-2 rounded-lg ${isCompleted ? "bg-blue-500/20 text-blue-400" : "bg-neutral-800 text-neutral-500"
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <h3
                                                className={`text-lg font-bold ${isCompleted ? "text-white" : "text-neutral-500"
                                                    }`}
                                            >
                                                {event.status}
                                            </h3>
                                            {isCompleted && (
                                                <span className="ml-auto text-sm text-neutral-400 font-mono">
                                                    {event.time}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </TracingBeam>
            </div>
        </div>
    );
}
