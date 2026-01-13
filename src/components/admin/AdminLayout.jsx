import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { User, Menu } from "lucide-react";

export default function AdminLayout({ children, activeTab, setActiveTab }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Close sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Initial check
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Floating Toggle Button (Visible when sidebar is closed) */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    type="button"
                    className="fixed top-24 left-4 z-50 p-2 bg-background/95 backdrop-blur border border-border rounded-lg shadow-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className={`p-4 pt-24 transition-all duration-300 ${sidebarOpen ? "md:ml-[18rem]" : "md:ml-0"}`}>
                {children}
            </div>
        </div>
    );
}
