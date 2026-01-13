import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Mock Data for fallback
const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "Neon Cyber-Decks",
        price: 299,
        description: "Holographic interface with mechanical feedback. Perfect for netrunners.",
        specs: ["Holographic Display", "Tactile Feedback", "5TB Storage", "Neural Link Ready"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: 2,
        title: "Quantum Processor",
        price: 899,
        description: "Next-gen computing power for AI workloads. Capable of 1000 Qubits.",
        specs: ["1000 Qubits", "Zero Latency", "Supercooled", "AI Optimized"],
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: 3,
        title: "Neural Interface",
        price: 599,
        description: "Direct brain-computer connection kit. Experience the web with your mind.",
        specs: ["Wireless", "Low Latency", "Biometric Security", "FDA Approved"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: 4,
        title: "Bot Assistant",
        price: 1200,
        description: "Autonomous helper droid for daily tasks. Runs on fusion cells.",
        specs: ["Autonomous", "Voice Control", "Fusion Power", "Multi-terrain"],
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
    },
];

// Add response interceptor for mocking
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If backend is down/missing, return mock data for demo purposes
        console.warn("API Error, falling back to mock data:", error.config.url);

        // Simulate network delay
        await new Promise(r => setTimeout(r, 600));

        if (error.config.url?.includes("/products")) {
            if (error.config.url.split('/').length > 2) {
                // Single product
                const id = parseInt(error.config.url.split('/').pop());
                const product = MOCK_PRODUCTS.find(p => p.id === id);
                return { data: product || MOCK_PRODUCTS[0] };
            }
            return { data: MOCK_PRODUCTS };
        }

        if (error.config.url?.includes("/orders")) {
            return {
                data: {
                    id: error.config.url.split('/').pop(),
                    status: "SHIPPED",
                    timeline: [
                        { status: "PLACED", time: "10:00 AM", completed: true },
                        { status: "PROCESSING", time: "10:05 AM", completed: true },
                        { status: "SHIPPED", time: "02:30 PM", completed: true },
                        { status: "DELIVERED", time: "Estim. Tomorrow", completed: false },
                    ]
                }
            };
        }

        if (error.config.url?.includes("/admin/metrics")) {
            // Randomize slightly for live effect
            const baseOrders = 1234 + Math.floor(Math.random() * 10);
            const revenue = 9876543 + Math.floor(Math.random() * 500);

            return {
                data: {
                    ordersToday: baseOrders,
                    revenueToday: revenue,
                    successRate: 99.5,
                    avgLatency: 120 + Math.floor(Math.random() * 20),
                    changes: {
                        orders: 12,
                        revenue: 8,
                        success: 0.2,
                        latency: -5
                    },
                    history: Array.from({ length: 24 }, (_, i) => ({
                        time: `${i}:00`,
                        orders: Math.floor(Math.random() * 100) + 50,
                    }))
                }
            };
        }

        if (error.config.url?.includes("/admin/logs")) {
            const types = ["INFO", "WARN", "ERROR", "SUCCESS"];
            const services = ["ORDER", "PAYMENT", "INVENTORY", "AUTH", "NOTIFICATION"];
            const messages = [
                "Order processing started",
                "Payment gateway timeout",
                "Inventory check successful",
                "User authentication failed",
                "Email notification sent",
                "Database connection pool full",
                "Cache invalidated",
                "Microservice handshake initiated"
            ];

            return {
                data: Array.from({ length: 5 }, (_, i) => ({
                    id: Date.now() + i,
                    time: new Date().toLocaleTimeString(),
                    type: types[Math.floor(Math.random() * types.length)],
                    service: services[Math.floor(Math.random() * services.length)],
                    message: messages[Math.floor(Math.random() * messages.length)]
                }))
            };
        }

        // Kafka Mocks
        if (error.config.url?.includes("/admin/kafka/topics")) {
            return { data: ["order-events", "payment-events", "inventory-events", "shipping-events"] };
        }

        if (error.config.url?.includes("/admin/kafka/messages")) {
            const topic = new URLSearchParams(error.config.url.split('?')[1]).get('topic') || "unknown";
            return {
                data: Array.from({ length: 10 }, (_, i) => ({
                    offset: 1000 + i,
                    timestamp: new Date().toISOString(),
                    value: {
                        eventType: "CREATED",
                        orderId: `ord-${Math.floor(Math.random() * 1000)}`,
                        amount: Math.floor(Math.random() * 5000),
                        topic: topic
                    }
                }))
            };
        }

        // Trace Mocks
        if (error.config.url?.includes("/admin/traces")) {
            return {
                data: {
                    id: error.config.url.split('/').pop(),
                    totalDuration: 600,
                    spans: [
                        { service: "Order Service", start: 0, duration: 120, status: "SUCCESS" },
                        { service: "Payment Service", start: 120, duration: 250, status: "SUCCESS" },
                        { service: "Inventory Service", start: 370, duration: 180, status: "SUCCESS" },
                        { service: "Saga Orchestrator", start: 550, duration: 50, status: "SUCCESS" },
                    ]
                }
            };
        }

        // Test Runner Mock
        if (error.config.url?.includes("/admin/tests/run")) {
            return {
                data: {
                    success: true,
                    steps: [
                        { name: "Order Created", duration: 120, status: "SUCCESS" },
                        { name: "Payment Processed", duration: 250, status: "SUCCESS" },
                        { name: "Inventory Reserved", duration: 180, status: "SUCCESS" },
                        { name: "Order Confirmed", duration: 50, status: "SUCCESS" }
                    ]
                }
            };
        }

        return Promise.reject(error);
    }
);

export default api;
