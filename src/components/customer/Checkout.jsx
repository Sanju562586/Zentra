import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const steps = ["Shipping", "Payment", "Confirm"];

export default function Checkout({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-2xl p-8 shadow-2xl"
            >
                <div className="flex justify-between items-center mb-8">
                    {steps.map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= currentStep ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-500'
                                }`}>
                                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                            </div>
                            <span className={i <= currentStep ? 'text-white' : 'text-neutral-500'}>
                                {step}
                            </span>
                            {i < steps.length - 1 && (
                                <div className="w-12 h-px bg-neutral-800 mx-2" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {currentStep === 0 && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                key="step1"
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-white mb-6">Shipping Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="First Name" className="bg-neutral-800 border-white/10 rounded-lg p-3 text-white" />
                                    <input placeholder="Last Name" className="bg-neutral-800 border-white/10 rounded-lg p-3 text-white" />
                                    <input placeholder="Address" className="col-span-2 bg-neutral-800 border-white/10 rounded-lg p-3 text-white" />
                                    <input placeholder="City" className="bg-neutral-800 border-white/10 rounded-lg p-3 text-white" />
                                    <input placeholder="ZIP Code" className="bg-neutral-800 border-white/10 rounded-lg p-3 text-white" />
                                </div>
                            </motion.div>
                        )}
                        {/* Add other steps similarly */}
                    </AnimatePresence>
                </div>

                <div className="flex justify-end gap-3 mt-8 border-t border-white/10 pt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        {currentStep === steps.length - 1 ? 'Place Order' : 'Continue'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
