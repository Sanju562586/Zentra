import { LayoutDashboard, BarChart3, FileText, Terminal, Activity, Zap, TestTube, X, Menu } from "lucide-react";

const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "metrics", label: "Metrics", icon: BarChart3 },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "kafka", label: "Kafka Stream", icon: Terminal },
    { id: "tests", label: "Tests", icon: TestTube },
    { id: "traces", label: "Distributed Traces", icon: Activity },
    { id: "chaos", label: "Chaos Engineering", icon: Zap },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }) {
    return (
        <aside
            className={`fixed top-24 left-4 z-40 h-[calc(100vh-7rem)] w-64 rounded-xl transition-transform bg-background border border-border shadow-lg flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]"
                }`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🎛️</span>
                    <span className="font-semibold whitespace-nowrap text-foreground">
                        Admin
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        // Only close on mobile (controlled by parent layout if needed, but for now we keep it persistent on desktop)
                                        if (window.innerWidth < 768 && onClose) onClose();
                                    }}
                                    className={`flex items-center w-full p-2 rounded-lg group transition-all duration-300 ${isActive
                                        ? "bg-gradient-to-r from-[hsl(222,47%,11%)] via-[hsl(199,89%,48%)] to-[hsl(350,89%,60%)] text-white shadow-lg shadow-blue-500/20 dark:bg-none dark:bg-primary dark:text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 transition duration-75 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                        }`} />
                                    <span className="ml-3">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
