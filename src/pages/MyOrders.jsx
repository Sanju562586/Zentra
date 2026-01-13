import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/services/api";
import { Package, ChevronRight, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyOrders() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        const fetchOrders = async () => {
            try {
                // In a real app, this would use the user ID: api.get(`/orders/user/${user.id}`)
                const response = await api.get("/orders/user/mock-id");
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const getStatusColor = (status) => {
        switch (status) {
            case "DELIVERED":
                return "text-green-500 bg-green-500/10 border-green-500/20";
            case "SHIPPED":
                return "text-blue-500 bg-blue-500/10 border-blue-500/20";
            case "PROCESSING":
                return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
            default:
                return "text-neutral-500 bg-neutral-500/10 border-neutral-500/20";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "DELIVERED": return <CheckCircle className="w-4 h-4" />;
            case "SHIPPED": return <Truck className="w-4 h-4" />;
            case "PROCESSING": return <Clock className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    if (!user) return null; // Prevent flash before redirect

    return (
        <div className="min-h-screen pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <Package className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                            My Orders
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Track and manage your recent purchases
                        </p>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 w-full bg-muted/50 animate-pulse rounded-xl" />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-card/30">
                        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-6">Looks like you haven't bought anything yet.</p>
                        <Link to="/store">
                            <Button>Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="group relative overflow-hidden rounded-xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                            >
                                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">

                                    {/* Order Info */}
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-bold text-lg">{order.id}</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Ordered on <span className="text-foreground">{order.date}</span>
                                        </p>
                                    </div>

                                    {/* Items Preview */}
                                    <div className="flex-1 md:px-8">
                                        <div className="text-sm text-muted-foreground mb-1">Items</div>
                                        <div className="text-sm font-medium line-clamp-1">
                                            {order.items.map(item => item.name).join(", ")}
                                        </div>
                                    </div>

                                    {/* Total & Action */}
                                    <div className="flex items-center justify-between md:justify-end gap-6 min-w-[140px]">
                                        <div className="text-right">
                                            <div className="text-sm text-muted-foreground">Total</div>
                                            <div className="text-xl font-bold text-primary">
                                                ${order.total.toLocaleString()}
                                            </div>
                                        </div>

                                        <Link to={`/orders/${order.id}`}>
                                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground">
                                                <ChevronRight className="w-5 h-5" />
                                            </Button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
