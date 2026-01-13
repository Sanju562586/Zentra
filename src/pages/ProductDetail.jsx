import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCartStore } from "../store/useCartStore";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";

export default function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCartStore();

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => api.get(`/products/${id}`).then((res) => res.data),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-t-2 border-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Nav */}
            <div className="absolute top-0 left-0 p-8 z-10 w-full flex justify-between">
                <Link
                    to="/store"
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Store
                </Link>
            </div>

            <div className="container mx-auto px-4 min-h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full pt-20 lg:pt-0">
                    {/* Left: 3D Visual */}
                    <div className="flex items-center justify-center relative">
                        <CardContainer className="inter-var w-full max-w-lg">
                            <CardBody className="bg-transparent relative group/card border-none w-auto sm:w-[30rem] h-auto rounded-xl p-6">
                                <CardItem translateZ="100" className="w-full">
                                    <motion.img
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 15,
                                        }}
                                        src={product.image}
                                        className="h-96 w-full object-cover rounded-xl shadow-2xl shadow-blue-500/20"
                                        alt={product.title}
                                    />
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col justify-center space-y-8 lg:pr-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
                                {product.title}
                            </h1>
                            <p className="text-2xl text-blue-400 font-mono mt-4">
                                ${product.price}
                            </p>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-neutral-300 text-lg leading-relaxed"
                        >
                            {product.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">
                                Specifications
                            </h3>
                            <ul className="grid grid-cols-2 gap-4">
                                {product.specs?.map((spec, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2 text-neutral-300 bg-white/5 p-3 rounded-lg border border-white/5"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="pt-8"
                        >
                            <button
                                onClick={() => addItem(product)}
                                className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 text-lg"
                            >
                                <ShoppingBag className="w-5 h-5" /> Add to Cart
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
