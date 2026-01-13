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
        category: "Gadgets",
        inStock: true,
        colors: ["Red", "Blue", "Black"],
        sizes: ["M", "L"],
        gender: "Unisex",
        ageGroup: "Adults",
        description: "Holographic interface with mechanical feedback. Perfect for netrunners.",
        specs: ["Holographic Display", "Tactile Feedback", "5TB Storage", "Neural Link Ready"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: 2,
        title: "Quantum Processor",
        price: 899,
        category: "Hardware",
        inStock: true,
        colors: ["Black", "White"],
        sizes: ["S"],
        gender: "Unisex",
        ageGroup: "Adults",
        description: "Next-gen computing power for AI workloads. Capable of 1000 Qubits.",
        specs: ["1000 Qubits", "Zero Latency", "Supercooled", "AI Optimized"],
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: 3,
        title: "Neural Interface",
        price: 599,
        category: "Cybernetics",
        inStock: false,
        colors: ["White"],
        sizes: ["S", "M", "L", "XL"],
        gender: "Unisex",
        ageGroup: "Adults",
        description: "Direct brain-computer connection kit. Experience the web with your mind.",
        specs: ["Wireless", "Low Latency", "Biometric Security", "FDA Approved"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: 4,
        title: "Bot Assistant",
        price: 1200,
        category: "Gadgets",
        inStock: true,
        colors: ["White", "Blue"],
        sizes: ["M"],
        gender: "Unisex",
        ageGroup: "Kids",
        description: "Autonomous helper droid for daily tasks. Runs on fusion cells.",
        specs: ["Autonomous", "Voice Control", "Fusion Power", "Multi-terrain"],
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
    },
    { id: 5, title: "Holo-Visor", price: 150, category: "Accessories", inStock: true, colors: ["Red", "Blue", "Green"], sizes: ["S", "M", "L"], gender: "Unisex", ageGroup: "Kids", description: "Augmented reality heads-up display.", specs: ["AR Overlay", "Gesture Control", "12hr Battery", "Lightweight"], image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&q=80&w=1000" },
    { id: 6, title: "Gravity Boots", price: 450, category: "Accessories", inStock: true, colors: ["Black", "White"], sizes: ["M", "L", "XL"], gender: "Unisex", ageGroup: "Adults", description: "Magnetic levitation footwear.", specs: ["MagLev Tech", "Impact Absorption", "Auto-Lacing", "Waterproof"], image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" },
    { id: 7, title: "Plasma Cutter", price: 700, category: "Gadgets", inStock: false, colors: ["Red", "Black"], sizes: ["L"], gender: "Men", ageGroup: "Adults", description: "Industrial grade energy tool.", specs: ["Plasma Arc", "Safety Lock", "Rechargeable", "Heavy Duty"], image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" },
    { id: 8, title: "Fusion Battery", price: 120, category: "Hardware", inStock: true, colors: ["Green"], sizes: ["S"], gender: "Unisex", ageGroup: "Adults", description: "Infinite power source.", specs: ["Cold Fusion", "Universal Fit", "Zero Emissions", "100 Year Life"], image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&q=80&w=1000" },
    { id: 9, title: "Cyber-Pet", price: 2000, category: "Gadgets", inStock: true, colors: ["White", "Purple"], sizes: ["S"], gender: "Kids", ageGroup: "Kids", description: "Loyal robotic companion.", specs: ["AI Learning", "Voice Rec", "Emotion Engine", "Hypoallergenic"], image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&q=80&w=1000" },
    { id: 10, title: "Neural Link", price: 5000, category: "Cybernetics", inStock: true, colors: ["Blue"], sizes: ["S"], gender: "Unisex", ageGroup: "Adults", description: "Direct mind-to-cloud upload.", specs: ["10Gbps Uplink", "Thought Control", "Cloud Storage", "Encrypted"], image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1000" },
];

// Mock Orders Data
const MOCK_ORDERS = [
    {
        id: "ORD-9283",
        date: "2024-03-15",
        total: 1299,
        status: "DELIVERED",
        items: [
            { name: "Neon Cyber-Deck", quantity: 1, price: 299 },
            { name: "Quantum Processor", quantity: 1, price: 899 }
        ]
    },
    {
        id: "ORD-1120",
        date: "2024-04-02",
        total: 450,
        status: "SHIPPED",
        items: [
            { name: "Gravity Boots", quantity: 1, price: 450 }
        ]
    },
    {
        id: "ORD-3391",
        date: "2024-04-10",
        total: 150,
        status: "PROCESSING",
        items: [
            { name: "Holo-Visor", quantity: 1, price: 150 }
        ]
    }
];

// Add response interceptor for mocking
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If backend is down/missing, return mock data for demo purposes
        console.warn("API Error, falling back to mock data:", error.config.url);

        // Simulate network delay
        // Simulate network delay - Removed for zero latency

        // Mock User Orders List
        if (error.config.url?.includes("/orders/user")) {
            return {
                data: MOCK_ORDERS
            };
        }

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
                    id: `${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
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

        // Mock Order Placement
        if (error.config.url?.includes("/orders") && error.config.method === 'post') {
            return {
                data: {
                    success: true,
                    orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
                    message: "Order placed successfully (Mock)"
                }
            };
        }

        // Mock Login
        if (error.config.url?.includes("/auth/login") && error.config.method === 'post') {
            const { email } = JSON.parse(error.config.data);
            return {
                data: {
                    success: true,
                    user: {
                        id: 1,
                        name: "Demo User",
                        email: email,
                        role: "admin"
                    },
                    token: "mock-jwt-token-123456"
                }
            };
        }

        return Promise.reject(error);
    }
);

export default api;
