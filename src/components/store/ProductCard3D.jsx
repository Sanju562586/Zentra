import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { useCartStore } from "@/store/useCartStore";
import { Link } from "react-router-dom";

export default function ProductCard3D({ id, title, description, price, image, inStock = true }) {
    const { addItem } = useCartStore();

    return (
        <CardContainer className="inter-var" containerClassName="py-0">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-full h-auto rounded-xl p-6 border">
                <div className="flex justify-between items-start">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        {title}
                    </CardItem>
                    <CardItem
                        translateZ="40"
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${inStock
                            ? "bg-green-500/10 text-green-500 border border-green-500/20 group-hover/card:bg-green-500 group-hover/card:text-white"
                            : "bg-red-500/10 text-red-500 border border-red-500/20 group-hover/card:bg-red-500 group-hover/card:text-white"
                            }`}
                    >
                        {inStock ? "In Stock" : "Out of Stock"}
                    </CardItem>
                </div>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
                >
                    {description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <Link to={`/store/${id}`}>
                        <img
                            src={image}
                            height="1000"
                            width="1000"
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl cursor-pointer"
                            alt="thumbnail"
                        />
                    </Link>
                </CardItem>
                <div className="flex justify-between items-center mt-4">
                    <CardItem
                        translateZ={20}
                        as="div"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                        ${price}
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as="button"
                        onClick={() => addItem({ id, title, price, description, image })}
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                    >
                        Add to Cart
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
