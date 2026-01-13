import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, MapPin, Truck, Check, Wallet, Building } from "lucide-react";

export default function Checkout() {
    const { items, clearCart } = useCartStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Review

    // Totals
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 25.00;
    const total = subtotal + shipping;

    // Mock State for Form
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            navigate("/store");
        }
    }, [items, navigate]);

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            alert("Order Placed Successfully! (Mock)");
            navigate("/store");
        }, 2000);
    };

    if (items.length === 0) return null;

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <Link to="/store" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Store
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: FORMS */}
                    <div className="lg:col-span-2 space-y-8">
                        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

                        {/* 1. Address Section */}
                        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                                <h2 className="text-xl font-semibold">Shipping Address</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Saved Address 1 */}
                                <label className={`block relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === 1 ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-border hover:border-blue-300 dark:hover:border-neutral-700"}`}>
                                    <input
                                        type="radio"
                                        name="address"
                                        checked={selectedAddress === 1}
                                        onChange={() => setSelectedAddress(1)}
                                        className="absolute opacity-0"
                                    />
                                    <div className="flex items-start gap-4">
                                        <MapPin className={`w-5 h-5 mt-1 ${selectedAddress === 1 ? "text-blue-500" : "text-muted-foreground"}`} />
                                        <div>
                                            <p className="font-semibold text-foreground">Home</p>
                                            <p className="text-muted-foreground text-sm mt-1">123 Cyberpunk Avenue, Sector 7</p>
                                            <p className="text-muted-foreground text-sm">Neo Tokyo, NT 2077</p>
                                        </div>
                                        {selectedAddress === 1 && <Check className="w-5 h-5 text-blue-500 ml-auto" />}
                                    </div>
                                </label>

                                {/* Saved Address 2 */}
                                <label className={`block relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === 2 ? "border-blue-600 bg-blue-600/10" : "border-white/10 hover:border-white/30"}`}>
                                    <input
                                        type="radio"
                                        name="address"
                                        checked={selectedAddress === 2}
                                        onChange={() => setSelectedAddress(2)}
                                        className="absolute opacity-0"
                                    />
                                    <div className="flex items-start gap-4">
                                        <Building className={`w-5 h-5 mt-1 ${selectedAddress === 2 ? "text-blue-500" : "text-neutral-500"}`} />
                                        <div>
                                            <p className="font-semibold text-white">Office</p>
                                            <p className="text-neutral-400 text-sm mt-1">456 Corp Plaza, Floor 99</p>
                                            <p className="text-neutral-400 text-sm">Silicon Valley, CA 94025</p>
                                        </div>
                                        {selectedAddress === 2 && <Check className="w-5 h-5 text-blue-500 ml-auto" />}
                                    </div>
                                </label>

                                {/* Add New Button */}
                                <button className="w-full py-3 mt-2 border border-dashed border-neutral-700 text-neutral-400 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
                                    + Add New Address
                                </button>
                            </div>
                        </section>

                        {/* 2. Payment Section */}
                        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                                <h2 className="text-xl font-semibold">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setPaymentMethod("card")}
                                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === "card" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-foreground" : "border-border text-muted-foreground hover:border-blue-300 dark:hover:border-neutral-700"}`}
                                >
                                    <CreditCard className="w-6 h-6" />
                                    <span className="font-medium">Card</span>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod("paypal")}
                                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === "paypal" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-foreground" : "border-border text-muted-foreground hover:border-blue-300 dark:hover:border-neutral-700"}`}
                                >
                                    <Wallet className="w-6 h-6" />
                                    <span className="font-medium">PayPal</span>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod("cod")}
                                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-foreground" : "border-border text-muted-foreground hover:border-blue-300 dark:hover:border-neutral-700"}`}
                                >
                                    <Truck className="w-6 h-6" />
                                    <span className="font-medium">COD</span>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover bg-muted" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-foreground line-clamp-1">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                                            <p className="text-sm text-foreground mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-t border-border pt-4 mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-foreground font-bold text-lg pt-2 border-t border-border mt-2">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Place Order"
                                )}
                            </button>

                            <p className="text-xs text-center text-neutral-500 mt-4">
                                Secure Checkout by Zentra Pay
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
