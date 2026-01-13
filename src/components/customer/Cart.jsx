import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { isOpen, setIsOpen, items, updateQuantity, removeItem } = useCartStore();
    const navigate = useNavigate();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background/90 backdrop-blur-xl border-l border-border z-50 p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                                <ShoppingBag className="w-6 h-6" />
                                Cart ({items.length})
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-accent rounded-full transition-colors text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 h-[calc(100vh-200px)]">
                            {items.length === 0 ? (
                                <div className="text-center text-muted-foreground mt-20">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-medium text-foreground">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                ${item.price}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, Math.max(0, item.quantity - 1))
                                                    }
                                                    className="p-1 hover:bg-accent rounded text-foreground"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-foreground w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    className="p-1 hover:bg-accent rounded text-foreground"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-neutral-500 hover:text-red-400 self-start"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
                            <div className="flex justify-between text-foreground mb-4 text-lg font-medium">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/checkout");
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl"
                                disabled={items.length === 0}
                            >
                                Checkout
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
